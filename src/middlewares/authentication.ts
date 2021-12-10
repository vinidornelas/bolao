import { TokenPayload } from '../@types/dtos/usuarioDto';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
let token: string;  
const authenticationMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send('unauthorized');
  }
  try {
    const payload = verify(authorization, process.env.AUTH_SECRET) as TokenPayload;
    req.body.usuario = payload;
  } catch (error) {
    return res.status(403).send('Forbidden');
  }

  next();
}

export default authenticationMiddleware;