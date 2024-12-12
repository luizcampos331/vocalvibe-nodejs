import { InfrastructureError } from '@/infra/errors/infrastructure-error';
import OpenAiLlmGateway from '@/infra/gateways/llm/open-ai-llm-gateway';
import { env } from '@/main';

const implementations = {
  openAi: new OpenAiLlmGateway(),
};

class LlmGatewayFactory {
  public make() {
    if (!Object.keys(this).includes(env.LLM_IMPLEMENTATION)) {
      throw new InfrastructureError('Invalid gateway implementation - LLM');
    }
    return implementations[env.LLM_IMPLEMENTATION];
  }
}

export default LlmGatewayFactory;
