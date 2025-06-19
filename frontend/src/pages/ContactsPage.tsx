// frontend/src/pages/ContactsPage.tsx

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type { Contact } from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi, ContactsResponse } from "../api/contacts";
import ContactCard from "../components/contacts/ContactCard";
import ContactFormModal from "../components/contacts/ContactFormModal";
import ConfirmDeleteModal from "../components/contacts/ConfirmDeleteModal";
import ContactCardSkeleton from "../components/contacts/ContactCardSkeleton";
import { PlusCircle } from "lucide-react";
import MiniFooter from "../components/MiniFooter";

const PER_PAGE = 9;

const ContactsPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const { data, isLoading, isError, error } = useQuery<ContactsResponse, Error>(
    {
      queryKey: ["contacts", page],
      queryFn: () => contactsApi.getContacts({ page, perPage: PER_PAGE })
    }
  );

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
      setDeleteModalOpen(false);
      setEditingContact(null);
      setDeletingContact(null);
    },
    onError: (err: any) =>
      toast.error(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      )
  };

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => contactsApi.createContact(formData),
    onSuccess: () => {
      toast.success("Contact created successfully!");
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      contactsApi.updateContact(id, formData),
    onSuccess: () => {
      toast.success("Contact updated successfully!");
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: () => {
      toast.success("Contact deleted successfully!");
      mutationOptions.onSuccess();
    },
    onError: mutationOptions.onError
  });

  const handleSaveContact = async (formData: FormData) => {
    if (editingContact) {
      await updateMutation.mutateAsync({ id: editingContact.id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const totalPages = data?.data.totalPages || 0;
  const contacts = data?.data.data || [];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-text-default">
            Your Contacts
          </h1>
          <button
            onClick={() => {
              setEditingContact(null);
              setModalOpen(true);
            }}
            className="btn-primary flex items-center gap-2"
          >
            <PlusCircle size={20} />
            Add Contact
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <ContactCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16 bg-surface rounded-lg">
            <h3 className="text-xl text-danger">
              Error: {(error as Error).message || "Failed to load contacts"}
            </h3>
          </div>
        ) : !data || contacts.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-lg">
            <p className="text-text-secondary text-lg">No contacts found.</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 text-primary-500 font-semibold hover:underline"
            >
              Add your first contact
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={(c) => {
                  setEditingContact(c);
                  setModalOpen(true);
                }}
                onDelete={(c) => {
                  setDeletingContact(c);
                  setDeleteModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {/* Pagination can be added here */}
          </div>
        )}

        <ContactFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveContact}
          contact={editingContact}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />

        {deletingContact && (
          <ConfirmDeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => deleteMutation.mutate(deletingContact.id)}
            contactName={deletingContact.name}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </div>
      <MiniFooter />
    </>
  );
};

export default ContactsPage;
