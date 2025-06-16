import React, { useState } from "react";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest,
  GetContactsParams // Додано
} from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi, GetContactsResponse } from "../api/contacts";
import ContactCard from "../components/contacts/ContactCard";
import ContactFormModal from "../components/contacts/ContactFormModal";
import ConfirmDeleteModal from "../components/contacts/ConfirmDeleteModal";
import ContactCardSkeleton from "../components/contacts/ContactCardSkeleton";

const PER_PAGE = 10; // Змінено з PAGE_SIZE

const ContactsPage = () => {
  // const user = useAuthStore((state) => state.user); // Видалено, оскільки не використовується
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);

  // Fetch contacts
  const { data, isLoading, isError, error } = useQuery<
    GetContactsResponse,
    Error
  >({
    queryKey: ["contacts", page],
    queryFn: () => contactsApi.getContacts({ page, perPage: PER_PAGE }) // Змінено limit на perPage
  });

  // Mutations (без змін, оскільки вони використовують типи, які вже будуть оновлені)
  // ...

  // Pagination helpers
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PER_PAGE); // Змінено PAGE_SIZE на PER_PAGE
  // ...
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <button
          onClick={() => {
            setEditingContact(null);
            setModalOpen(true);
          }}
          className="btn"
        >
          Add Contact
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <ContactCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-red-500 text-center py-8">
          {(error as Error).message || "Failed to load contacts"}
        </div>
      ) : !data || data.contacts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No contacts found</p>
          <button
            onClick={() => {
              setEditingContact(null);
              setModalOpen(true);
            }}
            className="mt-4 text-primary-500 hover:text-primary-600 hover:underline"
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
              onEdit={() => handleEdit(contact)}
              onDelete={() => handleDelete(contact)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn-secondary"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`btn ${
                page === i + 1 ? "bg-primary-500 text-white" : "btn-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn-secondary"
          >
            Next
          </button>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingContact(null);
        }}
        onSubmit={async (data) => {
          if (editingContact) {
            await updateMutation.mutateAsync({
              id: editingContact.id,
              data: data as UpdateContactRequest
            });
          } else {
            await createMutation.mutateAsync(data as CreateContactRequest);
          }
        }}
        contact={editingContact || undefined}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingContact(null);
        }}
        onConfirm={handleConfirmDelete}
        contact={deletingContact!}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default ContactsPage;
