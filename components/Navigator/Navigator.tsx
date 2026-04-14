"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/assets/logo.svg";
import ProjectsIcon from "@/assets/project.svg";
import TimerIcon from "@/assets/timer.svg";
import HistoryIcon from "@/assets/history.svg";
import SettingsIcon from "@/assets/setting.svg";

const routeConfig = [
  {
    name: "Projects",
    path: "/projects",
    Icon: ProjectsIcon,
  },
  {
    name: "Timer",
    path: "/timer",
    Icon: TimerIcon,
  },
  {
    name: "History",
    path: "/history",
    Icon: HistoryIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    Icon: SettingsIcon,
  },
] as const;

export default function Navigator() {
  const currentPath = usePathname();

  return (
    <nav className="bg-surface-primary fixed bottom-0 z-50 flex h-fit w-full items-center justify-between px-6 py-4 shadow-sm md:top-0">
      <Link
        className="hidden shrink-0 items-center gap-2 md:flex"
        href="/timer"
      >
        <LogoIcon className="h-10 w-10" />
        <span className="text-lg leading-tight">
          Time
          <br />
          Tracker
        </span>
      </Link>
      <div className="flex w-full justify-between gap-2 md:w-fit">
        {routeConfig.map((route) => (
          <Link
            href={route.path}
            key={route.name}
            className={clsx(
              currentPath.startsWith(route.path)
                ? "bg-teal hover:bg-teal-hover text-white"
                : "hover:bg-teal-hover text-text-primary hover:text-white",
              "flex flex-col items-center gap-2 rounded-lg px-4 py-2 text-sm md:flex-row",
            )}
          >
            <route.Icon className="h-5 w-5" />
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
