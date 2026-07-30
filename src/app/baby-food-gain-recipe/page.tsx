import type { Metadata } from "next";
import BabyFoodClientPage from "./BabyFoodClientPage";

export const metadata: Metadata = {
  title: "100+ Healthy Weight Gain Recipes For Children (6 Months – 3 Years) | Parento",
  description: "100+ Nutritious Indian Weight Gain Recipes for Toddlers (6 Months – 3 Years) + 200+ Bonus Digital Recipe Guide & Daily Meal Plan.",
  openGraph: {
    title: "100+ Healthy Weight Gain Recipes For Children (6 Months – 3 Years) | Parento",
    description: "100+ Nutritious Indian Weight Gain Recipes for Toddlers + 200+ Bonus Digital Recipe Guide.",
    images: ["/images/baby-food/thumbnail.png"],
  },
};

export default function BabyFoodGainRecipePage() {
  return <BabyFoodClientPage />;
}
