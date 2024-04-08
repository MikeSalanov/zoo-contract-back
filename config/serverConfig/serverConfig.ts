import express, { Express } from 'express';
import validateTokens from '../../middlewares/validateTokens.middleware';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const serverConfig: Function = (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use('/admin-account*', validateTokens);
}

export default serverConfig;
