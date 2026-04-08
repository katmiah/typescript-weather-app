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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
        />
        <div>
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
