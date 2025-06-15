import React, { useState } from "react";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type { Contact } from "../types/api";

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement contacts fetching
      toast.success("Contacts loaded successfully!");
    } catch (error) {
      toast.error("Failed to load contacts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <button
          onClick={() => {
            /* TODO: Implement add contact */
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Contact
        </button>
      </div>

      {isLoading ? (
        <div>Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No contacts found</p>
          <button
            onClick={() => {
              /* TODO: Implement add contact */
            }}
            className="mt-4 text-blue-500 hover:underline"
          >
            Add your first contact
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="border rounded p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold">{contact.name}</h3>
              <p className="text-gray-600">{contact.email}</p>
              <p className="text-gray-600">{contact.phone}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => {
                    /* TODO: Implement edit contact */
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    /* TODO: Implement delete contact */
                  }}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
