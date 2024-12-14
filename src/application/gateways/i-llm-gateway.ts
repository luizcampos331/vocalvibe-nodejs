export interface ILlmGateway {
  generateAudio(data: GenerateLlmAudioInput): Promise<GenerateLlmAudioOutput>;
  transcribeAudio(
    data: TranscribeLlmAudioInput,
  ): Promise<TranscribeLlmAudioOutput>;
}

export type GenerateLlmAudioInput = {
  content: string;
};

export type GenerateLlmAudioOutput = {
  audio: Buffer;
};

export type TranscribeLlmAudioInput = {
  filePath: string;
};

export type TranscribeLlmAudioOutput = {
  text: string;
  duration: number;
};
