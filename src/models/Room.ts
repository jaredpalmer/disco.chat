import { Dao, DaoEntity } from './Dao';
import * as Joi from 'joi';

const RoomSchema = Joi.object().keys({
  url: Joi.string()
    .uri()
    .required()
    .description('url'),
  siteId: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .description('Site id'),
  messageCount: Joi.number()
    .required()
    .description('messageCount'),
  status: Joi.string()
    .only('ACTIVE', 'INACTIVE')
    .required()
    .description('Room status'),
});

export interface Room {
  url: string;
  siteId: string;
  teamId: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export const RoomDao = new Dao<Room & DaoEntity>({
  collection: 'room',
  schema: RoomSchema,
  createSchema: s => s.optionalKeys('id'),
  updateSchema: s => (s as any).forbiddenKeys('id', 'siteId'),
});
