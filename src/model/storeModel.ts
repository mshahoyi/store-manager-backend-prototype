import { object, string } from "yup";

export const createStoreSchema = object().shape({
  name: string().required(),
  logo: string().required(),
});
