const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function MenuCard({ menu, onAdd, quantity }) {
  const habis = menu.stok === 0;

  return (
    <article className={`menu-card ${habis ? "menu-card--empty" : ""}`}>
      <div className="menu-card__header">
        <span className="menu-tag">{menu.kategori}</span>
        <span className={`stock-badge ${habis ? "stock-badge--empty" : ""}`}>
          {habis ? "Stok habis" : `${menu.stok} tersisa`}
        </span>
      </div>

      <h3>{menu.nama}</h3>
      <p className="menu-price">{formatRupiah(menu.harga)}</p>

      <div className="menu-card__footer">
        <span className="menu-qty">{quantity > 0 ? `Dipesan: ${quantity}` : "Belum dipesan"}</span>
        <button type="button" onClick={() => onAdd(menu)} disabled={habis}>
          {habis ? "Habis" : "Tambah"}
        </button>
      </div>
    </article>
  );
}
