import { bucket } from './firebase';
import { Writable } from "node:stream";

function uploadFileToFirebase(
  fileBuffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<string> {
  return new Promise<string>((resolve: Function, reject: Function) => {
    const file = bucket.file(fileName);
    const stream: Writable = file.createWriteStream({
      metadata: {
        contentType: mimeType,
      },
    });
    
    stream.on('error', (error) => reject(error));
    
    stream.on('finish', async () => {
      await file.makePublic();
      
      const url: string = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      resolve(url);
    });
    
    stream.end(fileBuffer);
  });
}

export default uploadFileToFirebase;
