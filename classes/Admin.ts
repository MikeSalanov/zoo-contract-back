import uploadFileToFirebase from '../utils/uploadFileToFirebase';
const { Admin: Administrator, Animal, RefreshToken, Image, Tariff } = require('../db/models/index');
import bcrypt from 'bcrypt';
import {ImageFromDBEntityType} from "../types/imageFromDBEntity.type";
import {UnparsedDataOfAnimalsFromDBType} from "../types/unparsedDataOfAnimalsFromDB.type";
import {ParsedDataOfAnimalsFromDBType} from "../types/parsedDataOfAnimalsFromDB.type";
import {RequestOfEditAnimalType} from "../types/requests/requestOfEditAnimal.type";

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
  
  async addImageToDataBase(imageUrl: string): Promise<void> {
    try {
      const imagesFromDB: Array<ImageFromDBEntityType> = await Image.findAll({
        where: {
          url: imageUrl
        },
        raw: true
      });
      if (!imagesFromDB.length) await Image.create({
        url: imageUrl,
        animal_id: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch(err) {
      console.log('Error in addImageToDataBase, in Admin class', err);
    }
  }
  
  async bindImageToAnimal(imageUrl: string, animalId: number): Promise<boolean> {
    try {
      const imagesFromDB = await Image.findAll({ where: { url: imageUrl } });
      if (!imagesFromDB.length) return false;
      await Image.update({ animal_id: animalId }, {
        where: {
          url: imageUrl
        }
      });
      return true;
    } catch (err) {
      console.log('Error in bindImageToAnimal, in Admin class', err);
      return false;
    }
  }
  
  async uploadFile({ buffer, mimetype, originalname }: Express.Multer.File): Promise<string> {
    return await uploadFileToFirebase(buffer, mimetype, originalname);
  }
  
  async findAnimals(id: number | null): Promise<Array<ParsedDataOfAnimalsFromDBType>> {
    let animalsFromDB: Array<UnparsedDataOfAnimalsFromDBType>;
    if (id) {
      animalsFromDB = await Animal.findAll({
        where: { id },
        attributes: ['id', 'name', 'description'],
        include: [{
          model: Image,
          attributes: ['id', 'url']
        }],
        raw: true
      });
      console.log(animalsFromDB);
    } else {
      animalsFromDB = await Animal.findAll({
        attributes: ['id', 'name', 'description'],
        include: [{
          model: Image,
          attributes: ['id', 'url']
        }],
        raw: true
      });
    }
    const newArrayWithAnimals: Array<ParsedDataOfAnimalsFromDBType> = animalsFromDB.map(animal => ({
      id: animal.id,
      name: animal.name,
      description: animal.description,
      image_id: animal['Images.id'],
      image_url: animal['Images.url'],
    }));
    return newArrayWithAnimals;
  }
  
  async createAnimal(name: string, description: string): Promise<boolean> {
    try {
      await Animal.create({
        name,
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (err) {
      console.log('Error in createAnimal, in Admin class', err);
      return false;
    }
  }
  
  async editAnimal(animalId: number, objectForEditDataInDB: RequestOfEditAnimalType): Promise<boolean> {
    if (objectForEditDataInDB) {
      const animalFromDB: Array<{
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string
      }> = await Animal.findAll({
        where: {
          id: animalId
        }, raw: true
      });
      if (!animalFromDB) return false;
      await Animal.update(
        objectForEditDataInDB,
        { where: { id: animalId } }
      );
      return true;
    } else {
      return false;
    }
  }
  
  async removeAnimal(animalId: number): Promise<boolean> {
    const animalFromDB: Array<{
      name: string,
      description: string,
      createdAt: string,
      updatedAt: string
    }> = await Animal.findAll({
      where: {
        id: animalId
      }, raw: true
    });
    if (!animalFromDB) return false;
    await Animal.destroy(
      { where: { id: animalId } }
    );
    return true;
  }
}
