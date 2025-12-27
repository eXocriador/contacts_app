import { Contacts } from '../db/models/contact';
import { IContact } from '../types/models';
import { IUser } from '../types/models';
import { uploadImage } from './cloudinary';
import { Express } from 'express';

// Format contact for response (remove sensitive data, transform _id to id)
export const formatContactResponse = (contact: any) => {
  const contactObj = contact.toObject ? contact.toObject() : contact;
  return {
    id: contactObj._id,
    name: contactObj.name,
    email: contactObj.email,
    phoneNumber: contactObj.phoneNumber,
    isFavourite: contactObj.isFavourite,
    photo: contactObj.photo,
    contactType: contactObj.contactType,
    createdAt: contactObj.createdAt,
    updatedAt: contactObj.updatedAt,
  };
};

export interface ContactFilters {
  search?: string;
  contactType?: string;
  isFavourite?: boolean;
}

export interface ContactSort {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export class ContactService {
  static async getContacts(
    userId: string,
    filters: ContactFilters,
    sort: ContactSort,
    pagination: PaginationParams,
  ) {
    const { page, perPage } = pagination;
    const skip = (page - 1) * perPage;

    const query: any = { owner: userId };

    // Apply filters
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
      ];
    }

    if (filters.contactType && filters.contactType !== 'all') {
      query.contactType = filters.contactType;
    }

    if (filters.isFavourite !== undefined) {
      query.isFavourite = filters.isFavourite;
    }

    const [contacts, total] = await Promise.all([
      Contacts.find(query)
        .sort({ [sort.sortBy]: sort.sortOrder })
        .skip(skip)
        .limit(perPage),
      Contacts.countDocuments(query),
    ]);

    return {
      contacts,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
      hasNextPage: page < Math.ceil(total / perPage),
      hasPrevPage: page > 1,
    };
  }

  static async getContactById(contactId: string, userId: string) {
    const contact = await Contacts.findOne({
      _id: contactId,
      owner: userId,
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  }

  static async createContact(
    contactData: Partial<IContact>,
    userId: string,
    file?: Express.Multer.File,
  ) {
    let photoUrl: string | undefined;

    if (file) {
      const result = await uploadImage(file);
      photoUrl = result.secure_url;
    }

    const contact = await Contacts.create({
      ...contactData,
      owner: userId,
      photo: photoUrl,
    });

    return contact;
  }

  static async updateContact(
    contactId: string,
    userId: string,
    updateData: Partial<IContact>,
    file?: Express.Multer.File,
  ) {
    let photoUrl: string | undefined;

    if (file) {
      const result = await uploadImage(file);
      photoUrl = result.secure_url;
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner: userId },
      {
        ...updateData,
        ...(photoUrl && { photo: photoUrl }),
      },
      { new: true, runValidators: true },
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  }

  static async deleteContact(contactId: string, userId: string) {
    const contact = await Contacts.findOneAndDelete({
      _id: contactId,
      owner: userId,
    });

    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  }

  static async toggleFavourite(contactId: string, userId: string) {
    const contact = await Contacts.findOne({ _id: contactId, owner: userId });

    if (!contact) {
      throw new Error('Contact not found');
    }

    contact.isFavourite = !contact.isFavourite;
    await contact.save();

    return contact;
  }
}
