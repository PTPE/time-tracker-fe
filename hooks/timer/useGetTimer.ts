import { TimerStatus } from "@/types/worklog";
import { useEffect, useRef, useState } from "react";

type Props = {
  startAt?: number | null;
  pauseAt?: number | null;
  timerStatus: TimerStatus;
  pauseDuration?: number;
};

export default function useGetTimer({
  startAt,
  pauseAt,
  timerStatus,
  pauseDuration = 0,
}: Props) {
  const [secFromStartTime, setSecFromStartTime] = useState<number>(0);

  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!startAt) return;

    function update(start: number, end: number) {
      setSecFromStartTime(Math.floor((end - start) / 1000) - pauseDuration);
    }

    if (timerStatus === "running") {
      function tick() {
        update(startAt!, new Date().getTime());
        rafRef.current = requestAnimationFrame(tick);
      }
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() =>
      update(startAt!, pauseAt ?? Date.now()),
    );
    return () => cancelAnimationFrame(rafRef.current);
  }, [startAt, timerStatus, pauseAt, pauseDuration]);

  const hours = Math.floor(secFromStartTime / 3600);
  const minutes = Math.floor((secFromStartTime % 3600) / 60);
  const seconds = secFromStartTime % 60;

  return { hours, minutes, seconds };
}
