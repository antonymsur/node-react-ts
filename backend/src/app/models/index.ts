const dbConfig = require("../config/db.config");

import mongoose, { Mongoose } from 'mongoose';

import { Address } from './address.model';

mongoose.Promise = global.Promise;
type dbType = {
    url: string;
    mongoose: Mongoose;
    address: typeof Address;
  };
export const database: dbType = {
mongoose : mongoose,
url : dbConfig.url,
address : Address
}
