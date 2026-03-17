import { getHomepage, getLatestPosts, getFeaturedProducts } from "@/lib/queries/homepage";
import HeroBanner from "@/components/home/HeroBanner";
import DiscoverProducts from "@/components/home/DiscoverProducts";
import DreamColour from "@/components/home/DreamColour";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import VideoSection from "@/components/home/VideoSection";
import VisualizerCTA from "@/components/home/VisualizerCTA";
import InspirationSection from "@/components/home/InspirationSection";
import PaintingServicesCTA from "@/components/home/PaintingServicesCTA";
import CallbackForm from "@/components/home/CallbackForm";

export default async function HomePage() {
  const [homepage, latestPosts, featuredProducts] = await Promise.all([
    getHomepage().catch(() => null),
    getLatestPosts(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <HeroBanner slides={homepage?.sliderRepeater ?? []} />
      <DiscoverProducts />
      <DreamColour />
      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      {homepage?.videoItems && homepage.videoItems.length > 0 && (
        <VideoSection videos={homepage.videoItems} />
      )}
      <VisualizerCTA />
      {latestPosts.length > 0 && <InspirationSection posts={latestPosts} />}
      <PaintingServicesCTA />
      <CallbackForm />
    </>
  );
}
