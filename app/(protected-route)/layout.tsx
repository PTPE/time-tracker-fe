import Navigator from "@/components/Navigator";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigator />
      {children}
    </div>
  );
}
