import React, { useState } from "react";
import { useAuthStore } from "../store/auth";
import { toast } from "react-hot-toast";
import type {
  Contact,
  CreateContactRequest,
  UpdateContactRequest
} from "../types/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi, GetContactsResponse } from "../api/contacts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PAGE_SIZE = 10;

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone is required")
});
type ContactFormValues = z.infer<typeof contactSchema>;

const ContactsPage = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Fetch contacts
  const { data, isLoading, isError, error } = useQuery<
    GetContactsResponse,
    Error
  >({
    queryKey: ["contacts", page],
    queryFn: () => contactsApi.getContacts({ page, limit: PAGE_SIZE })
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: contactsApi.createContact,
    onSuccess: () => {
      toast.success("Contact created");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
    },
    onError: () => toast.error("Failed to create contact")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactRequest }) =>
      contactsApi.updateContact(id, data),
    onSuccess: () => {
      toast.success("Contact updated");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setModalOpen(false);
      setEditingContact(null);
    },
    onError: () => toast.error("Failed to update contact")
  });

  const deleteMutation = useMutation({
    mutationFn: contactsApi.deleteContact,
    onSuccess: () => {
      toast.success("Contact deleted");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => toast.error("Failed to delete contact")
  });

  // Pagination helpers
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: editingContact || { name: "", email: "", phone: "" },
    values: editingContact || undefined
  });

  React.useEffect(() => {
    if (modalOpen) {
      reset(editingContact || { name: "", email: "", phone: "" });
    }
  }, [modalOpen, editingContact, reset]);

  const onSubmit = async (values: ContactFormValues) => {
    if (editingContact) {
      await updateMutation.mutateAsync({ id: editingContact.id, data: values });
    } else {
      await createMutation.mutateAsync(values);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Contacts</h1>
        <button
          onClick={() => {
            setEditingContact(null);
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Contact
        </button>
      </div>

      {isLoading ? (
        <div>Loading contacts...</div>
      ) : isError ? (
        <div className="text-red-500">
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
            className="mt-4 text-blue-500 hover:underline"
          >
            Add your first contact
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.contacts.map((contact) => (
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
                    setEditingContact(contact);
                    setModalOpen(true);
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(contact.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                page === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for add/edit contact */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setModalOpen(false);
                setEditingContact(null);
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingContact ? "Edit Contact" : "Add Contact"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border rounded px-3 py-2"
                  disabled={
                    isSubmitting ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full border rounded px-3 py-2"
                  disabled={
                    isSubmitting ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full border rounded px-3 py-2"
                  disabled={
                    isSubmitting ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingContact(null);
                  }}
                  disabled={
                    isSubmitting ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  disabled={
                    isSubmitting ||
                    createMutation.isPending ||
                    updateMutation.isPending
                  }
                >
                  {editingContact ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
