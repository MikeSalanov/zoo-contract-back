import {UnparsedDataOfAnimalsFromDBType} from "./unparsedDataOfAnimalsFromDB.type";

export type ParsedDataOfAnimalsFromDBType = Pick<UnparsedDataOfAnimalsFromDBType, 'id' | 'name' | 'description'> & {
  image_id: number,
  image_url: string
};
