import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";

interface UserProfileTabsProps {
  activeTab: "recipes" | "posts";
  onTabChange: (tab: "recipes" | "posts") => void;
}

export function UserProfileTabs({
  activeTab,
  onTabChange,
}: UserProfileTabsProps) {
  return (
    <Row className="mt-8 mb-6 w-full gap-x-4 border-b border-gray-200">
      <Button
        variant={activeTab === "recipes" ? "secondary" : "text"}
        onClick={() => onTabChange("recipes")}
        className={`rounded-t-lg rounded-b-none px-6 py-2 ${
          activeTab === "recipes"
            ? "bg-green-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Receitas Publicadas
      </Button>
      <Button
        variant={activeTab === "posts" ? "secondary" : "text"}
        onClick={() => onTabChange("posts")}
        className={`rounded-t-lg rounded-b-none px-6 py-2 ${
          activeTab === "posts"
            ? "bg-green-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Posts na Comunidade
      </Button>
    </Row>
  );
}
