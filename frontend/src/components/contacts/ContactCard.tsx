import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Edit, Trash, Star, Mail, Phone } from "lucide-react";
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
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -5, boxShadow: "0 0 15px 0 rgba(34, 197, 94, 0.3)" }
      }
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
      className="bg-surface rounded-xl border border-border flex flex-col h-full"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={(() => {
                if (
                  contact.photo &&
                  contact.photo.includes("res.cloudinary.com")
                ) {
                  return contact.photo.replace(
                    "/upload/",
                    "/upload/w_64,h_64,c_fill,q_auto,f_auto/"
                  );
                }
                return (
                  contact.photo ||
                  `https://ui-avatars.com/api/?name=${contact.name.replace(
                    " ",
                    "+"
                  )}&background=161B22&color=e6edf3`
                );
              })()}
              alt={contact.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-text-default truncate">
                {contact.name}
              </h3>
              <p className="text-sm text-text-secondary capitalize">
                {contact.contactType}
              </p>
            </div>
          </div>
          {contact.isFavourite && (
            <Star className="text-yellow-400 w-5 h-5 flex-shrink-0" />
          )}
        </div>
        <div className="space-y-3 text-sm text-text-secondary">
          <p className="flex items-center gap-2 truncate">
            <Mail size={16} /> {contact.email}
          </p>
          <p className="flex items-center gap-2 truncate">
            <Phone size={16} /> {contact.phoneNumber}
          </p>
        </div>
      </div>
      <div className="p-4 bg-background/50 border-t border-border flex justify-end space-x-3">
        <button
          onClick={() => onEdit(contact)}
          className="btn-secondary flex items-center gap-2"
        >
          <Edit size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="btn-danger flex items-center gap-2"
        >
          <Trash size={16} /> Delete
        </button>
      </div>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders unless props change
export default React.memo(ContactCard);
