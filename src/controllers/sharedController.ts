import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'yup';
import { ObjectShape } from 'yup/lib/object';

export const validatePayload =
  <T extends ObjectShape>(schema: ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req.body.payload)
      .then(() => next())
      .catch(next);
  };
