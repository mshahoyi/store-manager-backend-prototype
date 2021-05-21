import { paginationQueryFormatter } from "../../src/utils/paginationUtils";

declare global {
  namespace Express {
    interface Request {
      paginationQueries: ReturnType<typeof paginationQueryFormatter>;
    }
  }
}
