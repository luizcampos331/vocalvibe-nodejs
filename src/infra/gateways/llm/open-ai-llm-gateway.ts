import {
  GenerateLlmAudioInput,
  GenerateLlmAudioOutput,
  ILlmGateway,
  TranscribeLlmAudioInput,
  TranscribeLlmAudioOutput,
} from '@/application/gateways/i-llm-gateway';
import OpenAI from 'openai';
import fs from 'fs';
import { env } from '@/main';

class OpenAiLlmGateway implements ILlmGateway {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  public async generateAudio({
    content,
  }: GenerateLlmAudioInput): Promise<GenerateLlmAudioOutput> {
    const mp3 = await this.client.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: content,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    console.log('mp3', mp3);

    return {
      audio: buffer,
    };
  }

  public async transcribeAudio({
    filePath,
  }: TranscribeLlmAudioInput): Promise<TranscribeLlmAudioOutput> {
    const response = await this.client.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
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
