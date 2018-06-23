import { Dao, DaoEntity } from './Dao';
import * as Joi from 'joi';

const MessageSchema = Joi.object().keys({
  username: Joi.string()
    .required()
    .description('username'),
  content: Joi.string()
    .required()
    .description('content'),
  url: Joi.string()
    .uri()
    .required()
    .description('url'),
  // roomId: Joi.string()
  //   .regex(/^[a-zA-Z0-9]{3,30}$/)
  //   .required()
  //   .description('Room id'),
});

export interface Message {
  username: string;
  content: string;
  url: string;
}

export const MessageDao = new Dao<Message & DaoEntity>({
  collection: 'Message',
  schema: MessageSchema,
  createSchema: s => s.optionalKeys('id'),
  updateSchema: s => (s as any).forbiddenKeys('id', 'url'),
});
