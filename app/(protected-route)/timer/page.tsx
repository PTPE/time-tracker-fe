import TimerView from "@/features/timer/TimerView";

export default function TimerPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10">
      <div>
        <h1 className="mb-1 text-3xl">Time Tracker</h1>
        <h2 className="text-text-tertiary">Track Your Projects</h2>
      </div>

      <TimerView />
    </div>
  );
}
