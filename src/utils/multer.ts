import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import path from 'path';

// multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!existsSync('./public/uploads')) {
      mkdirSync('./public/uploads', { recursive: true });
    }
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extension);
  },
});

export const upload = multer({ storage: storage, limits: { parts: 1000000 } });
