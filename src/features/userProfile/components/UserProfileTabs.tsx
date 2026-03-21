import Row from "@/shared/ui/Layout/Helpers/Row";
import clsx from "clsx";

interface UserProfileTabsProps {
  activeTab: "recipes" | "posts";
  onTabChange: (tab: "recipes" | "posts") => void;
}

export function UserProfileTabs({
  activeTab,
  onTabChange,
}: UserProfileTabsProps) {
  return (
    <Row className="w-fit gap-1 rounded-full border border-green-100 bg-green-100 p-1">
      <button
        onClick={() => onTabChange("recipes")}
        className={clsx(
          "font-maitree rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
          activeTab === "recipes"
            ? "bg-green-500 text-green-50"
            : "text-green-500 hover:bg-green-50 hover:text-green-500",
        )}
      >
        Receitas
      </button>
      <button
        onClick={() => onTabChange("posts")}
        className={clsx(
          "font-maitree rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
          activeTab === "posts"
            ? "bg-green-500 text-green-50"
            : "text-green-500 hover:bg-green-50 hover:text-green-500",
        )}
      >
        Posts
      </button>
    </Row>
  );
}
