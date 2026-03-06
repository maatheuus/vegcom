import { useState } from "react";
import Button from "@/shared/ui/Button";
import Row from "@/shared/ui/Layout/Helpers/Row";

interface UserProfileTabsProps {
  activeTab: "recipes" | "posts";
  onTabChange: (tab: "recipes" | "posts") => void;
}

export function UserProfileTabs({ activeTab, onTabChange }: UserProfileTabsProps) {
  return (
    <Row className="w-full gap-x-4 border-b border-gray-200 mt-8 mb-6">
      <Button
        variant={activeTab === "recipes" ? "solid" : "text"}
        onClick={() => onTabChange("recipes")}
        className={`px-6 py-2 rounded-t-lg rounded-b-none ${
          activeTab === "recipes"
            ? "bg-green-500 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Receitas Publicadas
      </Button>
      <Button
        variant={activeTab === "posts" ? "solid" : "text"}
        onClick={() => onTabChange("posts")}
        className={`px-6 py-2 rounded-t-lg rounded-b-none ${
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
