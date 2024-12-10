import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

interface Infos {
  fileSize: number;
  contentType: string;
  content: Buffer;
}

class FileTmp {
  private filePath: string;

  constructor(value: string) {
    this.filePath = path.resolve(__dirname, `../../../tmp/${value}`);
  }

  public async getSize(): Promise<number> {
    return (await fs.promises.stat(this.filePath)).size;
  }

  public async getBuffer(): Promise<Buffer> {
    return fs.promises.readFile(this.filePath);
  }

  public getContentType(): string {
    return mime.lookup(this.filePath) || '';
  }

  public async getInfos(): Promise<Infos> {
    return {
      fileSize: await this.getSize(),
      contentType: this.getContentType(),
      content: await this.getBuffer(),
    };
  }
}

export default FileTmp;
