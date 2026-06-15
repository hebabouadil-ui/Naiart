import { Hero } from "@/components/home/Hero";
import { FeaturedArtwork } from "@/components/home/FeaturedArtwork";
import { ArtistStory } from "@/components/home/ArtistStory";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedArtwork />
      <ArtistStory />
      <CollectionsSection />
      <Newsletter />
    </>
  );
}
