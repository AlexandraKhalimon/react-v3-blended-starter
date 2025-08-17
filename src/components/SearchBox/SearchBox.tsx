import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  value: string;
}

export default function SearchBox({ onSearch, value }: SearchBoxProps) {
  return (
    <input
      onChange={(event) => onSearch(event.target.value)}
      className={css.input}
      value={value}
      type="text"
      placeholder="Search posts"
    />
  );
}