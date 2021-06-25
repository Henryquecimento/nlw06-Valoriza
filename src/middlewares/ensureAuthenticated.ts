
import { NextFunction, Request, response, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated (request: Request, respose: Response, next: NextFunction ) {
  //Reveive Token
  const authtoken = request.headers.authorization;

  //Validade if token is written
  if (!authtoken) {
    return respose.status(401).end();
  }

  const [,token] = authtoken.split(" ") 
  /* Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... -> Baerer (space) token
  */

  try {
    //Validate if token is valid
    const { sub } = verify(
      token, 
      "ac0b33d67cff472e1616d7525fbe6f14"
     ) as IPayload 
     /*"ac0b33d67cff472e1616d7525fbe6f14" from Authenticate service*/
    
    //Get user information
    request.user_id = sub;

    return next();

  } catch (err) {
    return response.status(401).end();
  }


  
}
