import multer from "multer";

// TODO Figure out safer way to future-proof uploading many/large files
// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, `/images/avatars/${req.params.userId}`);
//   },
//   filename(req, file, callback) {
//     callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Please upload an image"));
  }
};

const imageUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default { upload: imageUpload };
