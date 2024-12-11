import {
  IStorageGateway,
  SaveStorageInput,
} from '@/application/gateways/i-storage-gateway';
import fs from 'fs';
import path from 'path';

class DiskStorageGateway implements IStorageGateway {
  public async save({
    content,
    filename,
    folder,
  }: SaveStorageInput): Promise<void> {
    await fs.promises.mkdir(path.resolve(__dirname, `../../../tmp/${folder}`));
    await fs.promises.appendFile(
      path.resolve(__dirname, `../../../../tmp/${folder}/${filename}`),
      content,
    );
  }
}

export default DiskStorageGateway;
