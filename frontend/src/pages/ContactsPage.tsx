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
import { useAuthStore } from "../store/auth";
import { authApi } from "../api/auth";
import { typeList } from "../constants/contacts";

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
  const { user, token, updateUser } = useAuthStore();

  const shouldFetchContacts = !!user;
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
        }),
      enabled: shouldFetchContacts
    }
  );

  const contactsQueryKey = [
    "contacts",
    page,
    debouncedSearch,
    filterState.contactType,
    filterState.isFavourite,
    filterState.sortBy,
    filterState.sortOrder
  ];

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => contactsApi.createContact(formData),
    onMutate: async (formData) => {
      await queryClient.cancelQueries({ queryKey: contactsQueryKey });
      const previousData =
        queryClient.getQueryData<ContactsResponse>(contactsQueryKey);
      let tempPhotoUrl: string | undefined = undefined;
      const entries = Array.from(formData.entries());
      const newContact: Contact = {
        id: "temp-" + Date.now(),
        name: "",
        email: "",
        phoneNumber: "",
        isFavourite: false,
        contactType: "personal",
        owner: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      for (const [key, value] of entries) {
        if (key === "photo" && value instanceof File) {
          tempPhotoUrl = URL.createObjectURL(value);
          newContact.photo = tempPhotoUrl;
        } else if (key === "name" && typeof value === "string") {
          newContact.name = value;
        } else if (key === "email" && typeof value === "string") {
          newContact.email = value;
        } else if (key === "phoneNumber" && typeof value === "string") {
          newContact.phoneNumber = value;
        } else if (key === "isFavourite" && typeof value === "string") {
          newContact.isFavourite = value === "true" || value === "on";
        } else if (key === "contactType" && typeof value === "string") {
          newContact.contactType = value as (typeof typeList)[number];
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
      if (context?.previousData) {
        queryClient.setQueryData(contactsQueryKey, context.previousData);
      }
      if (context?.tempPhotoUrl) {
        URL.revokeObjectURL(context.tempPhotoUrl);
      }
      const errorMessage =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || err.message
          : "Failed to create contact. Changes reverted.";
      toast.error(errorMessage);
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

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      contactsApi.updateContact(id, formData),
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
      const errorMessage =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || err.message
          : "Failed to update contact. Changes reverted.";
      toast.error(errorMessage);
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
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
      const errorMessage =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message || err.message
          : "Failed to delete contact. Changes reverted.";
      toast.error(errorMessage);
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

  const totalPages = data?.data?.totalPages || 0;
  const contacts = data?.data?.data || [];

  const validContacts = contacts.filter(
    (c) =>
      c &&
      typeof c.name === "string" &&
      typeof c.email === "string" &&
      typeof c.phoneNumber === "string"
  );

  React.useEffect(() => {
    let isMounted = true;
    if (!user && token) {
      authApi
        .getCurrentUser()
        .then((u) => {
          if (isMounted) {
            updateUser(u);
          }
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [user, token, updateUser]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: PER_PAGE }).map((_, i) => (
          <ContactCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-surface rounded-lg">
        <h3 className="text-xl text-danger">
          Error: {(error as Error).message || "Failed to load contacts"}
        </h3>
      </div>
    );
  }

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
            onChange={(e) =>
              filterState.setContactType(
                e.target.value as (typeof typeList)[number]
              )
            }
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
            onChange={(e) =>
              filterState.setSortBy(e.target.value as "name" | "createdAt")
            }
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
            >
              <path
                d="M15.5 14.5L12 11l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11L8.5 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Contacts Grid */}
        {validContacts.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-lg">
            <p className="text-text-secondary text-lg">No contacts found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {validContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Modals */}
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
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingContact(null);
        }}
        onConfirm={() => {
          if (deletingContact) {
            deleteMutation.mutate(deletingContact.id);
          }
        }}
        contactName={deletingContact?.name || ""}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default ContactsPage;
