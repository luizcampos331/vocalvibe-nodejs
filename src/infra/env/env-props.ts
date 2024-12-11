export type EnvProps = {
  // Env
  NODE_ENV: 'test' | 'local' | 'development' | 'staging' | 'production';

  // Application
  APP_WEB_URL: string;

  // Database
  DATABASE_IMPLEMENTATION: 'prisma';
  DATABASE_URL: string;
  LOGGING: boolean;
};
