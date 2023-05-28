import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadIcon = multer({ storage: storage });
