import jwt, { SignOptions } from 'jsonwebtoken';

export const verifyJwt = <T>(token: string): T | null => {
    if(token == null) { 
        return null;
     };
    try {
      return jwt.verify(token, "verySecretKey") as T;
    } catch (error) {
      return null;
    }
  };

  export const signJwt = (payload: Object, key: string) => {
    return jwt.sign(payload, key)
  };