import { hashSync, compareSync, genSaltSync } from "bcryptjs";
class BcryptLib {
  static hashPassword(password: string) {
    try {
      const hashedPassword = hashSync(password, genSaltSync());
      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static comparePassword(password: string, hashedPassword: string) {
    try {
      const isValid = compareSync(password, hashedPassword);
      return isValid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default BcryptLib;
