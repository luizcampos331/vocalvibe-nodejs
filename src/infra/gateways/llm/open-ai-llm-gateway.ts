import {
  ILlmGateway,
  TranscribeLlmAudioInput,
  TranscribeLlmAudioOutput,
} from '@/application/gateways/i-llm-gateway';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

class OpenAiLlmGateway implements ILlmGateway {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  public async transcribeAudio({
    filename,
  }: TranscribeLlmAudioInput): Promise<TranscribeLlmAudioOutput> {
    const response = await this.client.audio.transcriptions.create({
      file: fs.createReadStream(
        path.resolve(__dirname, `../../../tmp/${filename}`),
      ),
      model: 'whisper-1',
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });

    return {
      text: response.text,
      duration: Number(response.duration),
    };
  }
}

export default OpenAiLlmGateway;
