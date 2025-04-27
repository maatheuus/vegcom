"use client";

import Background from "@/components/community/Background";
import Sidebar from "@/components/community/Sidebar";
import Header from "@/components/ui/Header";

export default function Page() {
  return (
    <div className="size-full">
      <Sidebar />
      <Background />
      <Header />
    </div>
  );
}
