import { LandingBackground } from "@/components/landing/landingBackground";
import { lazy } from "react";
const LandingMain = lazy(() => import("@/components/landing/landingMain"));

export default async function Home() {
  return (
    <>
      <div className="relative h-full min-h-screen">
        <LandingBackground />
      </div>
      <div className="m-auto max-w-6xl p-12">
        <LandingMain />
      </div>
    </>
  );
}
