import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export default class HandleToken {
  private secret: jwt.Secret | any;

  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  jwtHeadersConfig: jwt.SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  public getToken(payload: object): string {
    const token = jwt.sign(
      { data: payload },
      this.secret,
      this.jwtHeadersConfig,
    );
    return token;
  }
}
