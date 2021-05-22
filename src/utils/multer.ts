import multer from "multer";
import path from "path";

// multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

export const upload = multer({ storage: storage, limits: { parts: 1000000 } });
