import Navigator from "@/components/Navigator";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigator />
      <main className="pt-16 md:pt-16 pb-16 md:pb-0">{children}</main>
    </div>
  );
}
