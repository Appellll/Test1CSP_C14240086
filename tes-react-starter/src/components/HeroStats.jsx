export default function HeroStats({ totalMenu, readyCount, emptyCount }) {
  return (
    <div className="hero__stats">
      <div>
        <strong>{totalMenu}</strong>
        <span>Total menu</span>
      </div>
      <div>
        <strong>{readyCount}</strong>
        <span>Ready stock</span>
      </div>
      <div>
        <strong>{emptyCount}</strong>
        <span>Habis</span>
      </div>
    </div>
  );
}
