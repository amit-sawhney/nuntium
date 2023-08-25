import { User as NuntiumUser } from '@/user/model/user-model';

declare module 'express-serve-static-core' {
  interface Request {
    user?: NuntiumUser;
    _parsedUrl: {
      query: any;
    };
  }
}

declare global {
  namespace Express {
    export interface User extends NuntiumUser {}
  }
}
