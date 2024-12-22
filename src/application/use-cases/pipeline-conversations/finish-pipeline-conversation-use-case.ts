import { IWebsocketGateway } from '@/application/gateways/i-websocket-gateway';
import { IPipelineConversationRepository } from '@/application/repositories/i-pipeline-conversation-respository';
import { env } from '@/main';
import { ExceptionError } from '@/shared/errors/exception-error';

export type FinishPipelineConversationInput = {
  pipelineConversationId: string;
};

class FinishPipelineConversationUseCase {
  constructor(
    private readonly pipelineConversationRepository: IPipelineConversationRepository,
    private readonly websocketGateway: IWebsocketGateway,
  ) {}

  public async execute({
    pipelineConversationId,
  }: FinishPipelineConversationInput) {
    try {
      const pipelineConversation =
        await this.pipelineConversationRepository.findById({
          id: pipelineConversationId,
        });

      if (!pipelineConversation) {
        throw new Error('Pipeline conversation not found');
      }

      pipelineConversation.finish();
      await this.pipelineConversationRepository.update(pipelineConversation);

      await this.websocketGateway.emit({
        room: env.CONVERSATION_ROOM,
        event: env.FINISH_PIPELINE_CONVERSATION_EVENT,
        data: {
          pipelineConversationId,
        },
      });
    } catch (error) {
      throw new ExceptionError('Finish pipeline conversation failed', error);
    }
  }
}

export default FinishPipelineConversationUseCase;
