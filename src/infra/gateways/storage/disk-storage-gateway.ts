import {
  GetStorageInput,
  IStorageGateway,
  SaveStorageInput,
} from '@/application/gateways/i-storage-gateway';
import FileTmp from '@/domain/value-object/file-tmp';
import fs from 'fs';
import path from 'path';

class DiskStorageGateway implements IStorageGateway {
  public async get({ filename, folder }: GetStorageInput): Promise<Buffer> {
    return fs.promises.readFile(
      path.resolve(__dirname, `../../../../tmp/${folder}/${filename}`),
    );
  }

  public async save({
    content,
    filename,
    folder,
  }: SaveStorageInput): Promise<void> {
    const filePathTmp = new FileTmp(filename).getFilePathTmp();
    await fs.promises.appendFile(
      `${filePathTmp}/${folder}/${filename}`,
      content,
    );
    await fs.promises.unlink(`${filePathTmp}/${filename}`);
  }
}

export default DiskStorageGateway;
