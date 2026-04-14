import Navigator from "@/components/Navigator";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navigator />
      <main className="pt-20 pb-20 md:pb-0">{children}</main>
    </div>
  );
}
