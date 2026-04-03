import { SidebarIcon } from "@phosphor-icons/react";

interface Props {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function ToggleButton({ sidebarOpen, toggleSidebar }: Props) {
  return (
    <button
      onClick={toggleSidebar}
      title={sidebarOpen ? "Fechar menu" : "Abrir menu"}
      className="absolute top-0 -right-3 z-20 hidden h-fit cursor-pointer rounded-full bg-green-500 p-1 text-green-50 transition-colors hover:bg-green-200 lg:block"
      style={{
        transform: sidebarOpen ? "translateX(0)" : "translateX(16px)",
        transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <SidebarIcon size={20} />
    </button>
  );
}
