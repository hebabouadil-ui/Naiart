"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link as LinkIcon, RotateCcw, Upload } from "lucide-react";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { FieldGroup, Input, Textarea } from "@/components/admin/Field";
import { uploadImage } from "@/lib/upload-client";
import {
  useSiteContent,
  DEFAULT_PROFILE,
  type ArtistProfile,
} from "@/store/site-content";

const TABS = [
  "Content",
  "About",
  "Social",
  "SEO",
  "Email",
] as const;

export default function SettingsAdmin() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Content");
  const [saved, setSaved] = useState(false);

  // ── Artist profile (About tab) — wired to the persisted content store ──
  const storeProfile = useSiteContent((s) => s.profile);
  const setProfile = useSiteContent((s) => s.setProfile);
  const resetProfile = useSiteContent((s) => s.reset);
  const hydrated = useSiteContent((s) => s.hydrated);

  const [about, setAbout] = useState<ArtistProfile>(DEFAULT_PROFILE);
  const [uploadingPortrait, setUploadingPortrait] = useState(false);
  const portraitRef = useRef<HTMLInputElement>(null);

  // Mirror the store into the editable form once it has hydrated.
  useEffect(() => {
    if (hydrated) setAbout(storeProfile);
  }, [hydrated, storeProfile]);

  async function onPortraitFile(file: File | null | undefined) {
    if (!file) return;
    setUploadingPortrait(true);
    try {
      const url = (await uploadImage(file)) ?? URL.createObjectURL(file);
      setAbout((a) => ({ ...a, portrait: url }));
    } finally {
      setUploadingPortrait(false);
    }
  }

  function save() {
    if (tab === "About") {
      // Persist the artist profile so the About page updates immediately.
      setProfile({
        ...about,
        bio: about.bio.map((b) => b.trim()).filter(Boolean),
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage the storefront content, brand, and integrations."
        actions={
          <Button variant="gold" size="sm" magnetic={false} onClick={save}>
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full border px-5 py-2 font-grotesk text-[0.66rem] uppercase tracking-luxe-sm transition-colors",
              tab === t
                ? "border-charcoal bg-charcoal text-ivory"
                : "border-charcoal/15 text-graphite/70 hover:border-gold hover:text-gold",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-3xl rounded-2xl border border-charcoal/8 bg-warm-white p-7 shadow-soft">
        {tab === "Content" && (
          <div className="space-y-5">
            <FieldGroup label="Hero Headline">
              <Input defaultValue="Where Emotion Meets Canvas" />
            </FieldGroup>
            <FieldGroup label="Tagline">
              <Input defaultValue={BRAND.tagline} />
            </FieldGroup>
            <FieldGroup label="Hero Subtitle">
              <Textarea defaultValue="Original paintings from the Arles atelier — where light, memory, and pigment become something to live with." />
            </FieldGroup>
          </div>
        )}

        {tab === "About" && (
          <div className="space-y-5">
            <p className="rounded-xl bg-gold/8 px-4 py-3 font-sans text-xs text-graphite/70">
              These fields control the public{" "}
              <span className="font-medium text-charcoal">About / The Artist</span>{" "}
              page. Changes apply the moment you press Save.
            </p>

            <FieldGroup label="Artist Name">
              <Input
                value={about.name}
                onChange={(e) => setAbout({ ...about, name: e.target.value })}
                placeholder="Rabia Nainia"
              />
            </FieldGroup>

            <FieldGroup label="Hero Title (use a new line for the break)">
              <Textarea
                className="min-h-[70px]"
                value={about.heroTitle}
                onChange={(e) =>
                  setAbout({ ...about, heroTitle: e.target.value })
                }
                placeholder={"The hand\nbehind the light"}
              />
            </FieldGroup>

            <FieldGroup label="Hero Subtitle">
              <Textarea
                value={about.heroSubtitle}
                onChange={(e) =>
                  setAbout({ ...about, heroSubtitle: e.target.value })
                }
              />
            </FieldGroup>

            <FieldGroup label="Artist Biography (one paragraph per line)">
              <Textarea
                className="min-h-[200px]"
                value={about.bio.join("\n\n")}
                onChange={(e) =>
                  setAbout({
                    ...about,
                    bio: e.target.value.split(/\n{2,}/),
                  })
                }
              />
            </FieldGroup>

            <div>
              <p className="mb-2 font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
                Artist Photo
              </p>
              <div className="flex items-start gap-4">
                {/* live preview */}
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-charcoal/10 bg-soft-beige">
                  {about.portrait ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={about.portrait}
                      alt="Artist portrait"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex-1 space-y-2">
                  {/* paste a URL — always reliable */}
                  <div className="flex items-center gap-2 rounded-lg border border-charcoal/10 bg-warm-white px-3 focus-within:border-gold">
                    <LinkIcon className="h-4 w-4 shrink-0 text-gold" />
                    <input
                      value={about.portrait}
                      onChange={(e) =>
                        setAbout({ ...about, portrait: e.target.value })
                      }
                      placeholder="Paste an image URL (https://…)"
                      className="w-full bg-transparent py-2.5 font-sans text-sm outline-none"
                    />
                  </div>

                  {/* or upload (Cloudinary when configured) */}
                  <div
                    onClick={() => portraitRef.current?.click()}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-charcoal/15 px-4 py-3 text-center hover:border-gold/60"
                  >
                    <Upload className="h-4 w-4 text-gold" />
                    <span className="font-sans text-xs text-charcoal">
                      {uploadingPortrait
                        ? "Uploading…"
                        : "Or upload a portrait file"}
                    </span>
                    <input
                      ref={portraitRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onPortraitFile(e.target.files?.[0])}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                resetProfile();
                setAbout(DEFAULT_PROFILE);
              }}
              className="inline-flex items-center gap-2 font-grotesk text-[0.66rem] uppercase tracking-luxe-sm text-graphite/60 transition-colors hover:text-gold"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset to default
            </button>
          </div>
        )}

        {tab === "Social" && (
          <div className="space-y-5">
            <FieldGroup label="Instagram">
              <Input defaultValue={BRAND.social.instagram} />
            </FieldGroup>
            <FieldGroup label="Pinterest">
              <Input defaultValue={BRAND.social.pinterest} />
            </FieldGroup>
            <FieldGroup label="Behance">
              <Input defaultValue={BRAND.social.behance} />
            </FieldGroup>
            <FieldGroup label="YouTube">
              <Input defaultValue={BRAND.social.youtube} />
            </FieldGroup>
          </div>
        )}

        {tab === "SEO" && (
          <div className="space-y-5">
            <FieldGroup label="Meta Title">
              <Input defaultValue={`${BRAND.full} — ${BRAND.tagline}`} />
            </FieldGroup>
            <FieldGroup label="Meta Description">
              <Textarea defaultValue="The official online gallery of contemporary painter Rabia Nainia. Discover and acquire original paintings from the Arles atelier." />
            </FieldGroup>
            <FieldGroup label="Keywords">
              <Input defaultValue="original paintings, contemporary art, buy art online, luxury art gallery" />
            </FieldGroup>
          </div>
        )}

        {tab === "Email" && (
          <div className="space-y-5">
            <FieldGroup label="Resend API Key">
              <Input type="password" defaultValue="re_••••••••••••••••" />
            </FieldGroup>
            <FieldGroup label="From Address">
              <Input defaultValue={`studio@naiart.com`} />
            </FieldGroup>
            <FieldGroup label="Notification Email">
              <Input defaultValue={BRAND.email} />
            </FieldGroup>
          </div>
        )}
      </div>
    </div>
  );
}
