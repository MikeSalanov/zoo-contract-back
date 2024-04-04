import uploadFileToFirebase from '../utils/uploadFileToFirebase';

class Admin {
  static async uploadFile({ buffer, mimetype, originalname }: Express.Multer.File): Promise<string> {
    return await uploadFileToFirebase(buffer, mimetype, originalname);
  }
}

export default Admin;
