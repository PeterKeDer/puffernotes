import axios from "axios";

const apiUrl = 'http://localhost:8080';

async function postUpload(file) {
  const formData = new FormData();
  formData.append("audio", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const response = await axios.post(`${apiUrl}/upload`, formData, config);
  return response.data;
}

function getAudioLink(id) {
  return `${apiUrl}/audio/${id}`;
}

async function getStatus(id) {
  const response = await axios.get(`${apiUrl}/status/${id}`);
  return response.data;
}

export { postUpload, getAudioLink, getStatus };
