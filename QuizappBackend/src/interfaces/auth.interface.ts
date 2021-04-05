import {User} from '@prisma/client';
import { Request } from 'express';

export interface DataStoredInToken {
  id: User["id"],
  email: User["email"],
  roles: User["roles"]
}

export interface TokenData {
  token: string;
  expiresIn: number
}

export interface RequestWithUser extends Request {
  user: User
}