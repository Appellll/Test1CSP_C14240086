export default function CategoryFilter({ categories, active, onChange, counts = {} }) {
  return (
    <div className="category-filter" aria-label="Filter kategori menu">
      {categories.map((kategori) => {
        const jumlah = counts[kategori] ?? 0;

        return (
          <button
            key={kategori}
            type="button"
            className={active === kategori ? "is-active" : ""}
            onClick={() => onChange(kategori)}
          >
            {kategori} ({jumlah})
          </button>
        );
      })}
    </div>
  );
}
