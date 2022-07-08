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

  public generateToken(payload: object): string {
    const token = jwt.sign(
      { data: payload },
      this.secret,
      this.jwtHeadersConfig,
    );
    return token;
  }

  public getToken(userPayload: object): object {
    const token = this.generateToken(userPayload);
    return { token };
  }
}
