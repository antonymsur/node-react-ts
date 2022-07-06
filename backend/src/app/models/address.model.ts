// address.model.ts
import { Document, Model, Schema, model } from 'mongoose';

// Create the interface
export interface IAddress extends Document {
  name: String,
  email: String,
  phone: String,
  addrNumber: String,
  street: String,
  city: String,
  country: String,
  zip: String
}

// Create the schema
const AddressSchema = new Schema<IAddress>({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  addrNumber: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: "updatedAt"
  }
});

// Create and export Address model
export const Address: Model<IAddress> = model("address", AddressSchema);

