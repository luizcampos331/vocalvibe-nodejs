import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

class Multer {
  public upload: multer.Multer;

  constructor() {
    this.upload = multer({
      storage: multer.diskStorage({
        destination: path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'tmp',
        ),
        filename(_, file, callback) {
          let { originalname } = file;
          originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf-8',
          );
          const fileHash = randomBytes(5).toString('hex');
          const fileName = `${fileHash}-${originalname}`;

          return callback(null, fileName);
        },
      }),
    });
  }

  public single(fieldName?: string) {
    if (!fieldName) return undefined;
    return this.upload.single(fieldName);
  }
}

export default Multer;
