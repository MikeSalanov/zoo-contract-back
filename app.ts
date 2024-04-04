import express, { Express, Request, Response } from 'express';
import serverConfig from './config/serverConfig/serverConfig';
import indexRouter from './routes/index';

const PORT: number = 8000;

const app: Express = express();

serverConfig(app);

app.use('/', indexRouter);

app.listen(PORT, () => console.log('SERVER HAS BEEN STARTED ON PORT:', PORT));
