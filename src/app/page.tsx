import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { FeaturedArtwork } from "@/components/home/FeaturedArtwork";
import { ArtistStory } from "@/components/home/ArtistStory";
import { ArtisticProcess } from "@/components/home/ArtisticProcess";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturedVideo } from "@/components/home/FeaturedVideo";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-y border-current/10 bg-warm-white py-5 font-display text-xl italic dark:bg-deep-charcoal">
        <Marquee
          items={[
            "Original Oil Paintings",
            "Hand-Signed & Certified",
            "Worldwide White-Glove Shipping",
            "Bespoke Commissions",
            "Arles · Provence",
          ]}
        />
      </div>
      <FeaturedArtwork />
      <ArtistStory />
      <ArtisticProcess />
      <CollectionsSection />
      <Testimonials />
      <FeaturedVideo />
      <Newsletter />
    </>
  );
}
