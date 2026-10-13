export default function HeaderBar({ itemCount, showTimer, onToggleTimer, children }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">KantinKita</p>
        <h1>Menu favorit hari ini</h1>
      </div>
      <div className="topbar__right">
        <div className="topbar__badge">{itemCount} item</div>
        <button
          type="button"
          className="toggle-timer-btn"
          onClick={onToggleTimer}
        >
          {showTimer ? "Sembunyikan timer" : "Tampilkan timer"}
        </button>
        {children}
      </div>
    </header>
  );
}
