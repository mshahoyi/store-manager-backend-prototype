import { number, object, string } from "yup";

export const createCategorySchema = object().shape({
  storeId: number().required().positive(),
  name: string().required(),
  image: string().required(),
});
