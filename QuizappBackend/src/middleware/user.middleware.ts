import multer from "multer";

// Store files in memory
// TODO Figure out safer way to future-proof uploading many/large files
const storage = multer.memoryStorage();
const imageUpload = multer({
  storage: storage,
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new Error("Please upload an image"));
    }
  },
});

export default {upload: imageUpload};
