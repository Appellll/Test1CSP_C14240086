const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CartPanel({ items, totalHarga, onDecrease, onIncrease, onRemove }) {
  const handleRemoveClick = (menu) => {
    const yakin = window.confirm(`Hapus ${menu.nama} dari keranjang?`);
    if (yakin) {
      onRemove(menu.id);
    }
  };

  return (
    <aside className="cart-panel">
      <h3>Ringkasan pesanan</h3>

      {items.length > 0 ? (
        <>
          <ul className="cart-list">
            {items.map((menu) => (
              <li key={menu.id}>
                <div className="cart-item__info">
                  <strong>{menu.nama}</strong>
                  <small>
                    {menu.qty} x {formatRupiah(menu.harga)}
                  </small>
                </div>

                <div className="cart-item__controls">
                  <div className="qty-box">
                    <button
                      type="button"
                      onClick={() => onDecrease(menu.id)}
                      aria-label={`Kurangi ${menu.nama}`}
                    >
                      −
                    </button>
                    <span>{menu.qty}</span>
                    <button
                      type="button"
                      onClick={() => onIncrease(menu)}
                      aria-label={`Tambah ${menu.nama}`}
                      disabled={menu.qty >= menu.stok}
                    >
                      +
                    </button>
                  </div>

                  <button type="button" className="remove-btn" onClick={() => handleRemoveClick(menu)}>
                    Hapus
                  </button>
                </div>

                <span className="cart-item__total">
                  {formatRupiah(menu.harga * menu.qty)}
                </span>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatRupiah(totalHarga)}</strong>
          </div>

          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </>
      ) : (
        <p className="cart-empty">Belum ada menu yang dipilih.</p>
      )}
    </aside>
  );
}
