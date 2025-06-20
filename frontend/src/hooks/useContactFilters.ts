import { useReducer } from "react";

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

type Action =
  | { type: "setSearch"; payload: string }
  | { type: "setContactType"; payload: ContactType }
  | { type: "setIsFavourite"; payload: boolean }
  | { type: "setSortBy"; payload: SortBy }
  | { type: "setSortOrder"; payload: SortOrder };

const initialState: ContactFilters = {
  search: "",
  contactType: "all",
  isFavourite: false,
  sortBy: "name",
  sortOrder: "asc"
};

function reducer(state: ContactFilters, action: Action): ContactFilters {
  switch (action.type) {
    case "setSearch":
      return { ...state, search: action.payload };
    case "setContactType":
      return { ...state, contactType: action.payload };
    case "setIsFavourite":
      return { ...state, isFavourite: action.payload };
    case "setSortBy":
      return { ...state, sortBy: action.payload };
    case "setSortOrder":
      return { ...state, sortOrder: action.payload };
    default:
      return state;
  }
}

export const useContactFilters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    search: state.search,
    setSearch: (v: string) => dispatch({ type: "setSearch", payload: v }),
    contactType: state.contactType,
    setContactType: (v: ContactType) =>
      dispatch({ type: "setContactType", payload: v }),
    isFavourite: state.isFavourite,
    setIsFavourite: (v: boolean) =>
      dispatch({ type: "setIsFavourite", payload: v }),
    sortBy: state.sortBy,
    setSortBy: (v: SortBy) => dispatch({ type: "setSortBy", payload: v }),
    sortOrder: state.sortOrder,
    setSortOrder: (v: SortOrder) =>
      dispatch({ type: "setSortOrder", payload: v })
  };
};
