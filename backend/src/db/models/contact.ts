import { model, Schema } from 'mongoose';
import { handeSaveError, setUpdateSettings } from './hooks';
import { IContact } from '../../types/models';
import { typeList } from '../../constants/contacts';

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      index: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    photo: {
      type: String,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactSchema.index({ owner: 1, name: 1 });
contactSchema.index({ owner: 1, email: 1 });
contactSchema.index({ owner: 1, isFavourite: 1 });
contactSchema.index({ owner: 1, contactType: 1 });
contactSchema.index({ owner: 1, createdAt: -1 });

contactSchema.post('save', handeSaveError);
contactSchema.pre('findOneAndUpdate' as any, setUpdateSettings);
contactSchema.post('findOneAndUpdate' as any, handeSaveError);

export const Contacts = model<IContact>('Contact', contactSchema);
