// frontend/src/pages/ContactsPage.tsx

import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import type { Contact } from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi, ContactsResponse } from "../api/contacts";
import ContactCard from "../components/contacts/ContactCard";
import ContactFormModal from "../components/contacts/ContactFormModal";
import ConfirmDeleteModal from "../components/contacts/ConfirmDeleteModal";
import ContactCardSkeleton from "../components/contacts/ContactCardSkeleton";
import { PlusCircle } from "lucide-react";
import { useContactFilters } from "../hooks/useContactFilters";
import { useDebounce } from "../hooks/useDebounce";
import Pagination from "../components/Pagination";

const PER_PAGE = 9;

const ContactsPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeletingContact] = useState<Contact | null>(null);
  const filterState = useContactFilters();
  const debouncedSearch = useDebounce(filterState.search, 400);

  const { data, isLoading, isError, error } = useQuery<ContactsResponse, Error>(
    {
      queryKey: [
        "contacts",
        page,
        debouncedSearch,
        filterState.contactType,
        filterState.isFavourite,
        filterState.sortBy,
        filterState.sortOrder
      ],
      queryFn: () =>
        contactsApi.getContacts({
          page,
          perPage: PER_PAGE,
          search: debouncedSearch,
          contactType:
            filterState.contactType === "all"
              ? undefined
              : filterState.contactType,
          isFavourite: filterState.isFavourite,
          sortBy: filterState.sortBy,
          sortOrder: filterState.sortOrder
        })
    }
  );

  // --- Optimistic Update Helpers ---
  const contactsQueryKey = [
    "contacts",
    page,
    debouncedSearch,
    filterState.contactType,
    filterState.isFavourite,
    filterState.sortBy,
    filterState.sortOrder
  ];

  // --- Create Contact Mutation ---
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => contactsApi.createContact(formData),
    // Optimistically add the new contact to the cache
    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: contactsQueryKey });
      const previousData =
        queryClient.getQueryData<ContactsResponse>(contactsQueryKey);
      // Prepare optimistic contact
      let tempPhotoUrl: string | undefined = undefined;
      const entries = Array.from(formData.entries());
      const newContact: any = {
        id: "temp-" + Date.now()
      };
      for (const [key, value] of entries) {
        if (key === "photo" && value instanceof File) {
          tempPhotoUrl = URL.createObjectURL(value);
          newContact.photo = tempPhotoUrl;
        } else {
          newContact[key] = value;
        }
      }
      queryClient.setQueryData<ContactsResponse>(contactsQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: [newContact, ...old.data.data],
            totalItems: old.data.totalItems + 1
          }
        };
      });
      return { previousData, tempPhotoUrl };
    },
    onError: (err, _formData, context) => {
      // Rollback to previous state
      if (context?.previousData) {
        queryClient.setQueryData(contactsQueryKey, context.previousData);
      }
      if (context?.tempPhotoUrl) {
        URL.revokeObjectURL(context.tempPhotoUrl);
      }
      toast.error(
        (err as any)?.response?.data?.message ||
          "Failed to create contact. Changes reverted."
      );
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.tempPhotoUrl) {
        URL.revokeObjectURL(context.tempPhotoUrl);
      }
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
      setEditingContact(null);
    },
    onSuccess: () => {
      toast.success("Contact created successfully!");
    }
  });

  // --- Update Contact Mutation ---
  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      contactsApi.updateContact(id, formData),
    // Optimistically update the contact in the cache
    onMutate: async ({ id, formData }) => {
      await queryClient.cancelQueries({ queryKey: contactsQueryKey });
      const previousData =
        queryClient.getQueryData<ContactsResponse>(contactsQueryKey);
      const updatedFields = Object.fromEntries(formData.entries());
      queryClient.setQueryData<ContactsResponse>(contactsQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.map((c) =>
              c.id === id ? { ...c, ...updatedFields } : c
            )
          }
        };
      });
      return { previousData };
    },
    onError: (err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(contactsQueryKey, context.previousData);
      }
      toast.error(
        (err as any)?.response?.data?.message ||
          "Failed to update contact. Changes reverted."
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
      setEditingContact(null);
    },
    onSuccess: () => {
      toast.success("Contact updated successfully!");
    }
  });

  // --- Delete Contact Mutation ---
  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    // Optimistically remove the contact from the cache
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: contactsQueryKey });
      const previousData =
        queryClient.getQueryData<ContactsResponse>(contactsQueryKey);
      queryClient.setQueryData<ContactsResponse>(contactsQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: old.data.data.filter((c) => c.id !== id),
            totalItems: Math.max(0, old.data.totalItems - 1)
          }
        };
      });
      return { previousData };
    },
    onError: (err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(contactsQueryKey, context.previousData);
      }
      toast.error(
        (err as any)?.response?.data?.message ||
          "Failed to delete contact. Changes reverted."
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setDeleteModalOpen(false);
      setDeletingContact(null);
    },
    onSuccess: () => {
      toast.success("Contact deleted successfully!");
    }
  });

  const handleSaveContact = async (formData: FormData) => {
    if (editingContact) {
      await updateMutation.mutateAsync({ id: editingContact.id, formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const handleEdit = useCallback((c: Contact) => {
    setEditingContact(c);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((c: Contact) => {
    setDeletingContact(c);
    setDeleteModalOpen(true);
  }, []);

  const totalPages = data?.data.totalPages || 0;
  const contacts = data?.data.data || [];

  return (
    <div className="flex flex-col h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 flex flex-col h-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 md:gap-0">
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

        {/* Filter Bar */}
        <div className="bg-surface rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 md:gap-6 items-center shadow-sm">
          {/* Search Input */}
          <input
            type="text"
            className="input w-full md:w-64"
            placeholder="Search by name or email..."
            value={filterState.search}
            onChange={(e) => filterState.setSearch(e.target.value)}
            aria-label="Search contacts"
          />

          {/* Contact Type Dropdown */}
          <select
            className="input w-full md:w-40"
            value={filterState.contactType}
            onChange={(e) => filterState.setContactType(e.target.value as any)}
            aria-label="Filter by contact type"
          >
            <option value="all">All Types</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>

          {/* Favourite Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filterState.isFavourite}
              onChange={(e) => filterState.setIsFavourite(e.target.checked)}
              className="accent-primary-500"
            />
            <span className="text-sm">Favourites only</span>
          </label>

          {/* Sort By Dropdown */}
          <select
            className="input w-full md:w-40"
            value={filterState.sortBy}
            onChange={(e) => filterState.setSortBy(e.target.value as any)}
            aria-label="Sort by"
          >
            <option value="name">Name</option>
            <option value="createdAt">Creation Date</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            type="button"
            className="btn-secondary flex items-center gap-1 px-4"
            onClick={() =>
              filterState.setSortOrder(
                filterState.sortOrder === "asc" ? "desc" : "asc"
              )
            }
            aria-label="Toggle sort order"
          >
            <span>{filterState.sortOrder === "asc" ? "Asc" : "Desc"}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                filterState.sortOrder === "desc" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto min-h-0">
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
            <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-lg shadow-inner">
              {/* SVG Illustration */}
              <svg
                width="96"
                height="96"
                fill="none"
                viewBox="0 0 96 96"
                className="mb-6"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="46"
                  stroke="#34d399"
                  strokeWidth="4"
                  fill="#10151c"
                />
                <rect
                  x="28"
                  y="38"
                  width="40"
                  height="28"
                  rx="6"
                  fill="#60a5fa"
                />
                <rect x="36" y="46" width="24" height="4" rx="2" fill="#fff" />
                <rect x="36" y="54" width="16" height="4" rx="2" fill="#fff" />
                <circle
                  cx="48"
                  cy="32"
                  r="8"
                  fill="#f472b6"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </svg>
              <h2 className="text-2xl font-bold text-text-default mb-2">
                Your contact list is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Start building your network by adding your first contact.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl"
              >
                <span className="font-semibold">Add your first contact</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
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
    </div>
  );
};

export default ContactsPage;
