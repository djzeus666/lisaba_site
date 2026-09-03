import { Footer } from "@/components/sections/Footer";
import { HomepageBlocks } from "@/components/sections/HomepageBlocks";
import {
  getEquipment,
  getHomepageLayout,
  getMatkapitalSteps,
  getPricing,
  getPublishedReviews,
  getServices,
  getSiteSettings,
  getSpecialists,
} from "@/lib/cms/queries";

export default async function HomePage() {
  const [site, layout, services, specialists, pricing, equipment, matkapital, reviews] =
    await Promise.all([
      getSiteSettings(),
      getHomepageLayout(),
      getServices(),
      getSpecialists(),
      getPricing(),
      getEquipment(),
      getMatkapitalSteps(),
      getPublishedReviews(),
    ]);

  return (
    <>
      <HomepageBlocks
        data={{
          site,
          layout,
          services,
          specialists,
          pricing,
          equipment,
          matkapital,
          reviews,
        }}
      />
      <Footer />
    </>
  );
}
