"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "@/assets/logo.svg";

const routeConfig = [
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Timer",
    path: "/timer",
  },
  {
    name: "History",
    path: "/history",
  },
  {
    name: "Settings",
    path: "/settings",
  },
] as const;

export default function Navigator() {
  const currentPath = usePathname();

  return (
    <nav className="bg-surface-primary fixed h-fit bottom-0 md:top-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-sm">
      <Link
        className="md:flex hidden shrink-0 items-center gap-2"
        href="/timer"
      >
        <div className="bg-teal flex h-10 w-10 items-center justify-center rounded-lg">
          <LogoIcon className="h-6 w-6 text-white" />
        </div>
        <span className="text-lg leading-tight">
          Time
          <br />
          Tracker
        </span>
      </Link>
      <div className="flex gap-2 md:w-fit w-full justify-between">
        {routeConfig.map((route) => (
          <Link
            href={route.path}
            key={route.name}
            className={clsx(
              currentPath.startsWith(route.path)
                ? "bg-teal hover:bg-teal-hover text-white"
                : "hover:bg-teal-hover text-text-primary hover:text-white",
              "rounded-lg px-4 py-2 text-sm",
            )}
          >
            {route.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
