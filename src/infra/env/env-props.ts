export type EnvProps = {
  // Env
  NODE_ENV: 'test' | 'local' | 'development' | 'staging' | 'production';

  // Application
  APP_WEB_URL: string;
  HTTP_IMPLEMENTATION: 'express';
  HTTP_PORT: number;
  DOMAIN: string;
  REQUEST_BODY_LIMIT: string;

  // Database
  DATABASE_IMPLEMENTATION: 'postgreSQL';
  DATABASE_URL: string;
  DATABASE_LOG: boolean;

  // Storage
  STORAGE_IMPLEMENTATION: 'disk';

  // LLM
  LLM_IMPLEMENTATION: 'openAi';
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;
  OPENAI_TEMPERATURE: number;
  OPENAI_MAX_TOKENS: number;

  // Events
  SEND_QUESTION_TO_USER_EVENT: string;

  // Websocket
  WEBSOCKET_PORT: number;
  WEBSOCKET_IMPLEMENTATION: 'socketIo';
  CONVERSATION_ROOM: string;
};
