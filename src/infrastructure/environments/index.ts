import * as dotenv from 'dotenv';

dotenv.config();

export function getEnviroments(): any {
  return process.env;
}
