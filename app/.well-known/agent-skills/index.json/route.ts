import { NextResponse } from "next/server";

export async function GET() {
  const siteBase = "https://www.vegcom.life";

  const skills = {
    $schema: "https://agentskills.io/schema/v0.2.0/index.json",
    skills: [
      {
        name: "Recipe Search",
        type: "search",
        description: "Search for vegan and vegetarian recipes by ingredients, meal type, or name.",
        url: `${siteBase}/recipes`,
      },
      {
        name: "Community Interaction",
        type: "social",
        description: "Interact with the vegan community by viewing and sharing posts.",
        url: `${siteBase}/community`,
      },
    ],
  };

  return NextResponse.json(skills);
}
