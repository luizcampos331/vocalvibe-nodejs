import {
  IStorageGateway,
  SaveStorageInput,
} from '@/application/gateways/i-storage-gateway';
import FileTmp from '@/domain/value-object/file-tmp';
import fs from 'fs';

class DiskStorageGateway implements IStorageGateway {
  public async save({
    content,
    filename,
    folder,
  }: SaveStorageInput): Promise<void> {
    const filePathTmp = new FileTmp(filename).getFilePath();
    await fs.promises.appendFile(
      `${filePathTmp}/${folder}/${filename}`,
      content,
    );
    await fs.promises.unlink(`${filePathTmp}/${filename}`);
  }
}

export default DiskStorageGateway;
