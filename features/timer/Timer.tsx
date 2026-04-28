import StartIcon from "@/assets/start.svg";
import PauseIcon from "@/assets/pause.svg";
import StopIcon from "@/assets/stop.svg";
import { TimerStatus, WorkLog } from "@/types/worklog";
import { useRef, useState } from "react";
import { ModalRef } from "@/ui/Modal";
import useStartTimer from "@/hooks/timer/useStartTimer";
import usePauseTimer from "@/hooks/timer/usePauseTimer";
import useResumeTimer from "@/hooks/timer/useResumeTimer";
import useGetTimer from "@/hooks/timer/useGetTimer";
import ConfirmCompleteModal from "./ConfirmCompleteModal";

type Props = {
  projectId: string;
  activeLog?: WorkLog;
};

export default function Timer({ projectId, activeLog }: Props) {
  const timerStatus: TimerStatus =
    !activeLog || activeLog.status === "completed"
      ? "idle"
      : activeLog.pausedAt
        ? "paused"
        : "running";

  const { mutate: startTimer } = useStartTimer();
  const { mutate: pauseTimer } = usePauseTimer();
  const { mutate: resumeTimer } = useResumeTimer();
  const { hours, minutes, seconds } = useGetTimer({
    startAt: activeLog?.startedAt,
    pauseAt: activeLog?.pausedAt,
    timerStatus,
    pauseDuration: activeLog?.pauseDuration,
  });

  const [finishedAt, setFinishedAt] = useState(0);

  const confirmCompleteModalRef = useRef<ModalRef>(null);

  return (
    <>
      <div className="bg-surface-secondary w-full space-y-8 rounded-xl p-6 shadow-md">
        <div className="text-center">Session Time</div>
        <div className="text-center text-6xl">
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>

        <div className="flex gap-4 text-white">
          <button
            className="bg-teal flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-6 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              if (timerStatus === "paused") {
                resumeTimer({
                  projectId,
                  resumedAt: new Date().getTime(),
                });
              } else {
                startTimer({
                  projectId,
                  startedAt: new Date().getTime(),
                });
              }
            }}
            disabled={timerStatus === "running" || !projectId}
          >
            <StartIcon />
            <span>Start</span>
          </button>
          <button
            className="bg-amber flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-6 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              pauseTimer({ projectId, pausedAt: new Date().getTime() });
            }}
            disabled={timerStatus === "paused" || timerStatus === "idle"}
          >
            <PauseIcon />
            <span>Pause</span>
          </button>
          <button
            className="bg-text-primary flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-6 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              confirmCompleteModalRef.current?.onOpen();
              setFinishedAt(new Date().getTime());
            }}
            disabled={timerStatus === "idle"}
          >
            <StopIcon />
            <span>Stop</span>
          </button>
        </div>
      </div>

      <ConfirmCompleteModal
        ref={confirmCompleteModalRef}
        finishedAt={finishedAt}
        projectName={activeLog?.projectName || ""}
        startedAt={activeLog?.startedAt}
        pauseDuration={activeLog?.pauseDuration}
        projectId={activeLog?.projectId || ""}
      />
    </>
  );
}
