import jwt from "jsonwebtoken";

export type TJwtPayload = { role: string; id: number };

class JwtLib {
  static jwtSecret = process.env.JWT_SECRET || "jwt-super-secret";
  static async verifyToken(token: string): Promise<TJwtPayload> {
    try {
      const payload: TJwtPayload = jwt.verify(token, this.jwtSecret) as any;

      return payload;
    } catch (error) {
      throw error;
    }
  }

  static async createToken(payload: TJwtPayload) {
    try {
      const token = jwt.sign(payload, this.jwtSecret, {});

      return token;
    } catch (error) {
      throw error;
    }
  }
}

export default JwtLib;
