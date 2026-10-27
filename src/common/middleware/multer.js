import multer from "multer";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowTypes = ["image/png", "image/jpeg"];

    if (!allowTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid format"));
    }

    cb(null, true);
  };

  return multer({ storage, fileFilter });
};
