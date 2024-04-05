import uploadFileToFirebase from '../utils/uploadFileToFirebase';
const { Admin: Administrator, Animal, RefreshToken, Image, Tariff } = require('../db/models/index');
import bcrypt from 'bcrypt';

export class Admin {
  private readonly login: string;
  
  constructor(login: string) {
    this.login = login;
  }
  
  get getLogin(): string {
    return this.login;
  }
  
  async validateAuth(password: string): Promise<void> {
    const user = await Administrator.findOne({ where: { login: this.login } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid user credentials');
    }
  }
  
  async validateRegister(): Promise<boolean | null> {
    try {
      const isExists = !!(await Administrator.findOne({ where: { login: this.login } }));
      return isExists;
    } catch (err) {
      console.log('Error in validate register function, in class Admin', err);
      return null;
    }
  }
  
  async addRefreshTokenToUser(refreshToken: string): Promise<void> {
    try {
      const { dataValues } = await Administrator.findOne({
        where: { login: this.login },
      });
      await RefreshToken.create({
        token: refreshToken,
        user_id: dataValues.id,
        is_valid: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.log('Error in validate register function, in class Admin', err);
    }
  }
  
  async toRegister(password: string): Promise<void> {
    try{
      await Administrator.create({
        login: this.login,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.log('Error in toRegister function, in class Admin', err);
    }
  }
  
  async toMakeInvalidRefreshToken(token: string): Promise<void> {
    await RefreshToken.update({ is_valid: false }, { where: { token } });
  }
  
  static async uploadFile({ buffer, mimetype, originalname }: Express.Multer.File): Promise<string> {
    return await uploadFileToFirebase(buffer, mimetype, originalname);
  }
}
