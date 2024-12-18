export interface IStorageGateway {
  get(data: GetStorageInput): Promise<Buffer>;
  save(data: SaveStorageInput): Promise<void>;
}

type Folder = 'question-audio';

export type GetStorageInput = {
  filename: string;
  folder: Folder;
};

export type SaveStorageInput = {
  filename: string;
  fileSize: number;
  content: Buffer;
  contentType: string;
  folder: Folder;
};
