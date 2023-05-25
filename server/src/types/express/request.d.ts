import IJwtPayLoad from '../IJwtPayLoad.js';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayLoad;
    }
  }
}
