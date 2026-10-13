import { useEffect, useMemo, useRef, useState } from "react";
import { semuaMenu } from "./data/menu";
import MenuCard from "./components/MenuCard";
import TimerSesi from "./components/TimerSesi";
import HeaderBar from "./components/HeaderBar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import HeroStats from "./components/HeroStats";
import CartPanel from "./components/CartPanel";
import AddMenuForm from "./components/AddMenuForm";

const STORAGE_KEY = "kantinkita-cart";
const kategoriList = ["semua", "makanan", "minuman", "camilan"];

export default function App() {
  const [menuList, setMenuList] = useState(semuaMenu);
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [cari, setCari] = useState("");
  const [keranjang, setKeranjang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showTimer, setShowTimer] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const inputRef = useRef(null);

  const itemDipesan = Object.values(keranjang).reduce((total, qty) => total + qty, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
  }, [keranjang]);

  useEffect(() => {
    document.title = itemDipesan > 0 ? `(${itemDipesan}) KantinKita` : "KantinKita";
  }, [itemDipesan]);

  const menuTampil = useMemo(() => {
    return menuList.filter((menu) => {
      const cocokKategori =
        kategoriAktif === "semua" ? true : menu.kategori === kategoriAktif;
      const cocokCari = menu.nama.toLowerCase().includes(cari.toLowerCase());
      return cocokKategori && cocokCari;
    });
  }, [menuList, kategoriAktif, cari]);

  const daftarPesanan = useMemo(
    () =>
      menuList
        .filter((menu) => (keranjang[menu.id] ?? 0) > 0)
        .map((menu) => ({
          ...menu,
          qty: keranjang[menu.id],
        })),
    [menuList, keranjang]
  );

  const totalHarga = daftarPesanan.reduce(
    (total, menu) => total + menu.harga * menu.qty,
    0
  );

  const tambahMenu = (menu) => {
    if (menu.stok === 0) return;

    setKeranjang((prev) => {
      const qtySaatIni = prev[menu.id] ?? 0;
      const qtyBaru = qtySaatIni + 1;

      if (qtyBaru > menu.stok) {
        return prev;
      }

      return {
        ...prev,
        [menu.id]: qtyBaru,
      };
    });
  };

  const kurangMenu = (menuId) => {
    setKeranjang((prev) => {
      const qtySaatIni = prev[menuId] ?? 0;
      if (qtySaatIni <= 1) {
        const next = { ...prev };
        delete next[menuId];
        return next;
      }

      return {
        ...prev,
        [menuId]: qtySaatIni - 1,
      };
    });
  };

  const hapusMenu = (menuId) => {
    setKeranjang((prev) => {
      if (!(menuId in prev)) return prev;
      const next = { ...prev };
      delete next[menuId];
      return next;
    });
  };

  const bersihkanPencarian = () => {
    setCari("");
    inputRef.current?.focus();
  };

  const handleAddMenu = (newMenu) => {
    setMenuList((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newMenu,
      },
    ]);
  };

  return (
    <div className="app-shell">
      <HeaderBar
        itemCount={itemDipesan}
        showTimer={showTimer}
        onToggleTimer={() => setShowTimer((prev) => !prev)}
      >
        <span className="header-chip">KantinKita</span>
      </HeaderBar>

      {showTimer && <TimerSesi elapsedSeconds={elapsedSeconds} />}

      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Nikmati hidangan yang siap diantar</p>
          <h2>Rasa enak, harga ramah.</h2>
          <SearchBar
            value={cari}
            onChange={setCari}
            onClear={bersihkanPencarian}
            inputRef={inputRef}
          />
        </div>

        <HeroStats
          totalMenu={menuList.length}
          readyCount={menuList.filter((menu) => menu.stok > 0).length}
          emptyCount={menuList.filter((menu) => menu.stok === 0).length}
        />
      </section>

      <section className="toolbar">
        <CategoryFilter
          categories={kategoriList}
          active={kategoriAktif}
          onChange={setKategoriAktif}
          counts={{
            semua: menuList.length,
            makanan: menuList.filter((menu) => menu.kategori === "makanan").length,
            minuman: menuList.filter((menu) => menu.kategori === "minuman").length,
            camilan: menuList.filter((menu) => menu.kategori === "camilan").length,
          }}
        />
        <p className="result-count">{menuTampil.length} menu tersedia</p>
      </section>

      <AddMenuForm onSubmit={handleAddMenu} />

      <div className="content-grid">
        <main className="menu-grid">
          {menuTampil.length > 0 ? (
            menuTampil.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onAdd={tambahMenu}
                quantity={keranjang[menu.id] ?? 0}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>Menu tidak ditemukan</h3>
              <p>Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
            </div>
          )}
        </main>

        <CartPanel
          items={daftarPesanan}
          totalHarga={totalHarga}
          onDecrease={kurangMenu}
          onIncrease={tambahMenu}
          onRemove={hapusMenu}
        />
      </div>
    </div>
  );
}
