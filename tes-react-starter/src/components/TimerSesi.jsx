export default function TimerSesi({ elapsedSeconds }) {
  const menit = String(Math.floor(elapsedSeconds / 60)).padStart(2, "0");
  const detikTersisa = String(elapsedSeconds % 60).padStart(2, "0");

  return <div className="timer-sesi">Sesi: {menit}:{detikTersisa}</div>;
}
