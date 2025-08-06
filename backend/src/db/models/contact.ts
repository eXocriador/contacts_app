import { model, Schema } from 'mongoose';
import { handeSaveError, setUpdateSettings } from './hooks';
import { IContact } from '../../types/models';
import { typeList } from '../../constants/contacts';

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      index: true, // Add index for search performance
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      index: true, // Add index for search performance
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
      index: true, // Add index for filtering
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, // Add index for user queries
    },
    photo: {
      type: String,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
      index: true, // Add index for filtering
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Compound indexes for better query performance
contactSchema.index({ owner: 1, name: 1 });
contactSchema.index({ owner: 1, email: 1 });
contactSchema.index({ owner: 1, isFavourite: 1 });
contactSchema.index({ owner: 1, contactType: 1 });
contactSchema.index({ owner: 1, createdAt: -1 });

contactSchema.post('save', handeSaveError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', handeSaveError);

export const Contacts = model<IContact>('Contact', contactSchema);
