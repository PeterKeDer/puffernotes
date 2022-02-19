import axios from "axios";
import { promises as fs } from "fs";

function createAxiosInstance(headers, args) {
  headers = headers || {};
  args = args || {};

  return axios.create({
    baseURL: process.env.ASSEMBLY_AI_API_URL,
    headers: {
      authorization: process.env.ASSEMBLY_AI_API_KEY,
      "content-type": "application/json",
      ...headers,
    },
    ...args,
  });
}

// Methods for saving and loading status files

async function saveStatus(status) {
  const id = status.id;

  const statusBasePath = `${process.env.STORAGE_PATH}/status`;

  try {
    await fs.access(statusBasePath);
  } catch {
    await fs.mkdir(statusBasePath);
  }

  const statusPath = `${statusBasePath}/${id}.json`;
  await fs.writeFile(statusPath, JSON.stringify(status));
}

async function loadStatus(id) {
  const statusBasePath = `${process.env.STORAGE_PATH}/status`;

  try {
    await fs.access(statusBasePath);
  } catch {
    await fs.mkdir(statusBasePath);
  }

  const statusPath = `${statusBasePath}/${id}.json`;
  try {
    const status = await fs.readFile(statusPath);
    return JSON.parse(status);
  } catch {
    return null;
  }
}

// Request handlers

async function postUpload(req, res) {
  // Get file from multer
  const file = req.file;

  try {
    // Upload file to AssemblyAI
    const upload = createAxiosInstance(
      {
        "transfer-encoding": "chunked",
      },
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    const fileData = await fs.readFile(file.path);
    const uploadRes = await upload.post("/upload", fileData);
    const uploadUrl = uploadRes.data.upload_url;

    // Submit transcript request to AssemblyAI
    const postData = {
      audio_url: uploadUrl,
      auto_highlights: true,
      sentiment_analysis: true,
      auto_chapters: true,
      entity_detection: true,
    };
    const transcriptRes = await createAxiosInstance().post(
      "/transcript",
      postData
    );

    const status = transcriptRes.data;
    await saveStatus(status);

    // Return the status object as response
    res.json(status);
  } catch (e) {
    console.log(e);
    res.json({
      error: e.message,
    });
  } finally {
    // Delete file since it's no longer needed
    await fs.unlink(file.path);
  }
}

async function getAudioFile(req, res) {
  const filename = req.params.id;
  const path = `${process.env.STORAGE_PATH}/audio/${filename}`;

  if (!(await fs.access(path))) {
    res.download(path);
  } else {
    res.status(404).json({
      error: "File not found",
    });
  }
}

async function getResult(req, res) {
  const id = req.params.id;

  const status = await loadStatus(id);
  if (!status) {
    return res.status(404).json({
      error: "ID not found",
    });
  }

  if (status.status === "completed" || status.status === "error") {
    // No need to poll anymore
    return res.json(status);
  }

  const assembly = createAxiosInstance();
  const assemblyRes = await assembly.get(`/transcript/${id}`);

  const newStatus = assemblyRes.data;

  await saveStatus(newStatus);

  res.json(newStatus);
}

export { postUpload, getResult, getAudioFile };
