import "./App.css";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          required
          maxLength={50}
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
