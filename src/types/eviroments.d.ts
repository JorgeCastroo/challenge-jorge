declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_KEY: string;
    }
  }