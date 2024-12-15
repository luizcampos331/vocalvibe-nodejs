export interface ILlmGateway {
  generateAudio(data: GenerateLlmAudioInput): Promise<GenerateLlmAudioOutput>;
  transcribeAudio(
    data: TranscribeLlmAudioInput,
  ): Promise<TranscribeLlmAudioOutput>;
  getResponseByText(
    data: GetLlmResponseByTextInput,
  ): Promise<GetLlmResponseOutput>;
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

type Messages = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type GetLlmResponseByTextInput = {
  messages: Messages[];
};

export type GetLlmResponseOutput = {
  response: any;
  inputToken: number;
  outputToken: number;
};
