import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import { randomBytes } from 'crypto';

type Infos = {
  filename: string;
  fileSize: number;
  contentType: string;
};

class FileTmp {
  private filename: string;

  constructor(filename: string) {
    this.filename = `${randomBytes(5).toString('hex')}-${filename}`;
  }

  public async saveTmp(file: Buffer): Promise<void> {
    await fs.promises.writeFile(this.getFile(), file);
  }

  public async getSize(): Promise<number> {
    return (await fs.promises.stat(this.getFilePath())).size;
  }

  public getContentType(): string {
    return mime.lookup(this.getFilePath()) || '';
  }
  public getFilePath(): string {
    return path.resolve(__dirname, `../../../tmp`);
  }

  public getFile(): string {
    return path.resolve(__dirname, `../../../tmp/${this.filename}`);
  }

  public getFileName(): string {
    return this.filename;
  }

  public async getInfos(): Promise<Infos> {
    return {
      filename: this.getFileName(),
      fileSize: await this.getSize(),
      contentType: this.getContentType(),
    };
  }
}

export default FileTmp;
