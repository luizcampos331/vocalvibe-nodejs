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
  LOGGING: boolean;

  // Storage
  STORAGE_IMPLEMENTATION: 'disk';

  // LLM
  LLM_IMPLEMENTATION: 'openAi';
  OPENAI_API_KEY: string;
};
