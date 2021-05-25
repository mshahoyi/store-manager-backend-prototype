import { TimeMetadata } from './sharedTypes';

export interface Store extends TimeMetadata {
  id: number;
  name: string;
  logo: string;
}
