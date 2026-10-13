export default function SearchBar({ value, onChange, onClear, inputRef }) {
  return (
    <div className="search-box">
      <input
        ref={inputRef}
        type="text"
        placeholder="Cari menu favorit..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button type="button" className="clear-search-btn" onClick={onClear}>
          Bersihkan
        </button>
      )}
    </div>
  );
}
