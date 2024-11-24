import Banner from "@/components/Banner";
import HomeProducts from "@/components/HomeProducts";
// import { useTranslations } from "next-intl";

export default function HomePage() {
  // const t = useTranslations();
  return (
    <div className="container mx-auto ">
      <Banner />
      <HomeProducts />
    </div>
  );
}
