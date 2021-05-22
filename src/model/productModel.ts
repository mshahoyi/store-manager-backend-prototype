import { number, object, string } from "yup";

export const productCreateSchema = object().shape({
  name: string().required(),
  image: string().required(),
  categoryId: number().required().positive(),
});
