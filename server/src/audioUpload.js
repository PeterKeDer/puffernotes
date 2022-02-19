import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `${process.env.STORAGE_PATH}/audio`;
    fs.mkdirSync(path, { recursive: true })
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const audioUpload = multer({ storage: audioStorage });

export default audioUpload;
