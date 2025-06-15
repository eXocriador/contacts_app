import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {contact.photo ? (
              <img
                src={contact.photo}
                alt={contact.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-white text-2xl font-semibold">
                {contact.name[0].toUpperCase()}
              </div>
            )}
            {contact.isFavourite && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                ★
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {contact.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {contact.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {contact.phone}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/5 dark:bg-white/5 flex items-center justify-center space-x-4"
      >
        <button
          onClick={() => onEdit(contact)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <FaEdit className="w-5 h-5 text-primary-500" />
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-red-50 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <FaTrash className="w-5 h-5 text-red-500" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;
