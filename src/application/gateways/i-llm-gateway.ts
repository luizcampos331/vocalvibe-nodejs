export interface ILlmGateway {
  transcribeAudio(
    data: TranscribeLlmAudioInput,
  ): Promise<TranscribeLlmAudioOutput>;
}

export type TranscribeLlmAudioInput = {
  filename: string;
};

export type TranscribeLlmAudioOutput = {
  text: string;
  duration: number;
};
