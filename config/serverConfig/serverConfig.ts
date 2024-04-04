import express, { Express } from 'express';

const serverConfig: Function = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

export default serverConfig;
