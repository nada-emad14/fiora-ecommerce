import { Search } from "lucide-react";
type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  categories: string[];
  category: string;
  setCategory: (value: string) => void;

  priceCap: number;
  setPriceCap: (value: number) => void;
};
export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className="search-box">
      <Search size={16} />
      <input
        type="text"
        placeholder="Search pieces"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
    
  );
}
