"use client";
// import AsideCards from "@/components/community/AsideContent";
import Background from "@/components/community/Background";
import MainContent from "@/components/community/MainContent";
import Sidebar from "@/components/community/Sidebar";
import Grid from "@/components/ui/Layout/Helpers/Grid";

export default function Page() {
  return (
    <div className="size-full">
      <Sidebar />
      <Background />
      <Grid columns="16" className="h-dvh ml-20 mr-6">
        <MainContent className="col-start-1 col-end-16" />
        {/* <AsideCards className="col-start-13" /> */}
      </Grid>
    </div>
  );
}
