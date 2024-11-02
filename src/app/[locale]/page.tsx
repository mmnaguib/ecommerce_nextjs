import Banner from "@/components/Banner";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  return (
    <>
      <Banner />
    </>
  );
}
