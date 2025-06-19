import { useState } from "react";

export type ContactType = "all" | "personal" | "work" | "other";
export type SortBy = "name" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface ContactFilters {
  search: string;
  contactType: ContactType;
  isFavourite: boolean;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export const useContactFilters = () => {
  const [search, setSearch] = useState("");
  const [contactType, setContactType] = useState<ContactType>("all");
  const [isFavourite, setIsFavourite] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  return {
    search,
    setSearch,
    contactType,
    setContactType,
    isFavourite,
    setIsFavourite,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
  };
};
