import type { Metadata } from "next";
import SoulmateSketchClientPage from "./SoulmateSketchClientPage";

export const metadata: Metadata = {
  title: "Get Your Personalized Soulmate Sketch + Free Love Psychic Reading | AstroJi",
  description:
    "Discover your soulmate portrait and love insights with a personalized sketch and in-depth psychic love reading. Created by Dr. Shalini Sharma, spiritual intuitive with 10+ years of experience.",
  openGraph: {
    title: "Get Your Personalized Soulmate Sketch + Free Love Psychic Reading | AstroJi",
    description:
      "Your personalized Soulmate Portrait created using intuitive guidance, spiritual insight, and artistic interpretation.",
    images: ["/images/soulmate-sketch/Thumbnail.png"],
  },
};

export default function SoulmateSketchPage() {
  return <SoulmateSketchClientPage />;
}
