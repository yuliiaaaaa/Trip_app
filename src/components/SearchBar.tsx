import React from "react";

type Props = {
  query: string;
  setQuery: (query: string) => void;
};
export const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <input
      type="search"
      placeholder={`Search in trips...`}
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
