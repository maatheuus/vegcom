import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.vegcom.life";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/recipes", "/curiosities", "/user"],
      disallow: [
        "/chat/",
        "/account/",
        "/payment/",
        "/new-recipe/",
        "/edit-recipe/",
        "/api/",
        "/*?*",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
