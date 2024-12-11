export interface IStorageGateway {
  save(data: SaveStorageInput): Promise<void>;
}

type Folder = 'question-audio';

export type SaveStorageInput = {
  filename: string;
  fileSize: number;
  content: Buffer;
  contentType: string;
  folder: Folder;
};
