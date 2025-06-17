import React, { useState } from "react";
import { toast } from "react-hot-toast";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi, GetContactsResponse } from "../api/contacts";
import ContactCard from "../components/contacts/ContactCard";
import ContactFormModal from "../components/contacts/ContactFormModal";
import ConfirmDeleteModal from "../components/contacts/ConfirmDeleteModal";
import ContactCardSkeleton from "../components/contacts/ContactCardSkeleton";
import { PlusCircle } from "lucide-react";

const PER_PAGE = 9; // Збільшено для кращого вигляду

const ContactsPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  const { data, isLoading, isError, error } = useQuery<
    GetContactsResponse,
    Error
  >({
    queryKey: ["contacts", page],
    queryFn: () => contactsApi.getContacts({ page, perPage: PER_PAGE })
  });

  const createMutation = useMutation({
    mutationFn: (newData: CreateContactRequest) =>
      contactsApi.createContact(newData),
    onSuccess: () => {
      toast.success("Contact created successfully!");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
    },
    onError: (err) => toast.error(`Failed to create contact: ${err.message}`)
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactRequest }) =>
      contactsApi.updateContact(id, data),
    onSuccess: () => {
      toast.success("Contact updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
      setEditingContact(null);
    },
    onError: (err) => toast.error(`Failed to update contact: ${err.message}`)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: () => {
      toast.success("Contact deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteModalOpen(false);
      setDeletingContact(null);
    },
    onError: (err) => toast.error(`Failed to delete contact: ${err.message}`)
  });

  const handleSaveContact = async (
    formData: CreateContactRequest | UpdateContactRequest
  ) => {
    if (editingContact) {
      await updateMutation.mutateAsync({
        id: editingContact.id,
        data: formData
      });
    } else {
      await createMutation.mutateAsync(formData as CreateContactRequest);
    }
  };

  const totalPages = data?.totalPages || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-text-default">Your Contacts</h1>
        <button
          onClick={() => setModalOpen(true)}
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
      ) : !data || data.contacts.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-lg">
          <p className="text-text-secondary text-lg">No contacts found.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 text-primary-text font-semibold hover:underline"
          >
            Add your first contact
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.contacts.map((contact) => (
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
          {/* Pagination buttons can be added here */}
        </div>
      )}

      <ContactFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingContact(null);
        }}
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
  );
};

export default ContactsPage;
