import { db } from './db';
import { IMonkManager, ICollection } from 'monk';
import * as Joi from 'joi';

export interface DaoConfig {
  db?: IMonkManager;
  collection: string;
  options?: string | string[] | object[] | object;
  schema: Joi.ObjectSchema;
  createSchema: (schema: Joi.ObjectSchema) => Joi.ObjectSchema;
  updateSchema: (schema: Joi.ObjectSchema) => Joi.ObjectSchema;
}

export interface DaoEntity {
  id?: string;
  createId?: string;
  createAt?: string;
  updateId?: string;
  updateAt?: string;
  deleteId?: string;
  deleteAt?: string;
}

export class Dao<T extends DaoEntity> {
  db?: IMonkManager;
  collection: ICollection<T>;
  options?: string | string[] | object[] | object;
  schema: Joi.ObjectSchema;
  createSchema: Joi.ObjectSchema;
  updateSchema: Joi.ObjectSchema;
  constructor(opts: DaoConfig) {
    this.db = db || opts.db;
    this.collection = db.get(opts.collection);
    this.schema = opts.schema.keys({
      id: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .description('id'),
      createAt: Joi.date()
        .required()
        .description('Date created'),
      createId: Joi.string().description('Identifer of the user that created'),
      deleteAt: Joi.date().description('Date deleted'),
      deleteId: Joi.string().description(
        'Identifier of user that soft deleted the user'
      ),
      updateAt: Joi.date().description('Date updated'),
      updateId: Joi.string().description('Identifier of the user that updated'),
    });
    this.createSchema = opts.createSchema(this.schema);
    this.updateSchema = opts.updateSchema(this.schema);
  }

  toEntity = (item: any): T => {
    const i = item;
    i.id = item._id;
    delete i._id;
    return i;
  };

  toEntityList = (items: any[]): T[] => {
    return items.map(this.toEntity);
  };

  load = (id: string) => {
    return this.collection.findOne(id).then(this.toEntity);
  };

  find = (q: object) => {
    return this.collection.find(q).then(this.toEntityList);
  };

  /**
   * Drop the table
   */
  dropTable(): void {
    this.collection.drop();
  }

  create = (item: T, uuid?: string) => {
    if (uuid) {
      item.createId = uuid;
    }

    item.createAt = new Date().toISOString();

    this.collection.insert(item);
  };

  update = (id: string, updates: Partial<T>, uuid?: string) => {
    if (uuid) {
      updates.updateId = uuid;
    }

    updates.updateAt = new Date().toISOString();

    this.collection.update({ _id: id }, { $set: updates });
  };

  destroy = (id: string, uuid?: string) => {
    const update: any = { deleteAt: new Date().toISOString() };
    if (uuid) {
      update.deleteId = uuid;
    }
    return this.collection.update(id, update, uuid);
  };

  /**
   * Validate an object against its Base schema.
   * 
   * @param {Object} data Object to validate
   * @param {Function} [cb] validation response callback
   * @returns {Promise}
   */
  validate(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      Joi.validate(data, this.schema, (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(value);
      });
    });
  }

  /**
   * Validate an object against its Base schema. (Sync).
   * 
   * @param {Object} data Object to validate
   * @returns {ValidationResponse}
   */

  validateSync(data: T): Joi.ValidationResult<T> {
    return Joi.validate(data, this.schema);
  }

  /**
   * Validate an object against its New partial schema.
   * 
   * @param {Object} data Object to validate
   * @param {Function} [cb] validation response callback
   * @returns {Promise}
   */

  validateCreate(data: Partial<T>): Promise<Partial<T>> {
    return new Promise((resolve, reject) => {
      Joi.validate(data, this.createSchema, (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(value);
      });
    });
  }

  /**
   * Validate an object against its New partial schema. (Sync).
   * 
   * @param {Object} data Object to validate
   * @returns {ValidationResponse}
   */
  validateCreateSync(data: T): Joi.ValidationResult<T> {
    return Joi.validate(data, this.createSchema);
  }

  /**
   * Validate an object against its Update partial schema.
   * 
   * @param {Object} data Object to validate
   * @param {Function} [cb] validation response callback
   * @returns {Promise}
   */
  validateUpdate(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      Joi.validate(data, this.updateSchema, (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(value);
      });
    });
  }

  /**
   * Validate an object against its Update partial schema. (Sync).
   * 
   * @param {Object} data Object to validate
   * @returns {ValidationResponse}
   */
  validateUpdateSync(data: T): Joi.ValidationResult<T> {
    return Joi.validate(data, this.updateSchema);
  }
}
