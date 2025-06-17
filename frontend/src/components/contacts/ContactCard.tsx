// exocriador/contacts_app/contacts_app-main/frontend/src/components/contacts/ContactCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import type { Contact } from "../../types/api";

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={
                  contact.photo ||
                  `https://ui-avatars.com/api/?name=${contact.name}&background=random`
                }
                alt={contact.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                {contact.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {contact.contactType}
              </p>
            </div>
          </div>
          {contact.isFavourite && (
            <FaStar className="text-yellow-400 w-5 h-5" />
          )}
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p className="truncate">
            <strong>Email:</strong> {contact.email}
          </p>
          <p className="truncate">
            <strong>Phone:</strong> {contact.phoneNumber}
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button
          onClick={() => onEdit(contact)}
          className="btn btn-secondary flex items-center gap-2"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="btn btn-danger flex items-center gap-2"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default ContactCard;
