import IJwtPayLoad from '../IJwtPayLoad';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayLoad;
    }
  }
}
