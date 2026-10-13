import { useState } from "react";

const initialForm = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export default function AddMenuForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (formData.nama.trim().length < 3) {
      nextErrors.nama = "Nama minimal 3 karakter.";
    }

    if (!formData.kategori) {
      nextErrors.kategori = "Kategori wajib dipilih.";
    }

    if (!formData.harga || Number(formData.harga) <= 0) {
      nextErrors.harga = "Harga harus lebih dari 0.";
    }

    if (formData.stok === "" || Number(formData.stok) < 0) {
      nextErrors.stok = "Stok tidak boleh negatif.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      nama: formData.nama.trim(),
      kategori: formData.kategori,
      harga: Number(formData.harga),
      stok: Number(formData.stok),
    });

    setFormData(initialForm);
    setErrors({});
  };

  return (
    <section className="add-menu-panel">
      <div className="section-title-wrap">
        <h3>Tambah Menu Baru</h3>
      </div>

      <form onSubmit={handleSubmit} className="add-menu-form" noValidate>
        <div className="field-group">
          <label htmlFor="nama">Nama</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Masukkan nama menu"
          />
          {errors.nama && (
            <small className="error-text" role="alert">{errors.nama}</small>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="kategori">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
          >
            <option value="">Pilih kategori</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="camilan">Camilan</option>
          </select>
          {errors.kategori && (
            <small className="error-text" role="alert">{errors.kategori}</small>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="harga">Harga</label>
          <input
            id="harga"
            name="harga"
            type="number"
            min="1"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Contoh: 15000"
          />
          {errors.harga && (
            <small className="error-text" role="alert">{errors.harga}</small>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="stok">Stok</label>
          <input
            id="stok"
            name="stok"
            type="number"
            min="0"
            value={formData.stok}
            onChange={handleChange}
            placeholder="Contoh: 10"
          />
          {errors.stok && (
            <small className="error-text" role="alert">{errors.stok}</small>
          )}
        </div>

        <button type="submit" className="submit-btn">Tambah Menu</button>
      </form>
    </section>
  );
}
