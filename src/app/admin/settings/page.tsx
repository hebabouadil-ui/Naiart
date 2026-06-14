"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";
import { BRAND } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/Button";
import { FieldGroup, Input, Textarea } from "@/components/admin/Field";

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

  function save() {
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
            <FieldGroup label="Artist Biography">
              <Textarea
                className="min-h-[160px]"
                defaultValue="Naïa Lemaire grew up between the salt marshes of the Camargue and the print studios of Marseille. From her atelier in Arles, she works in oil and cold wax, building and breaking surfaces until a painting holds light the way memory holds a moment."
              />
            </FieldGroup>
            <div>
              <p className="mb-2 font-grotesk text-[0.66rem] font-medium uppercase tracking-luxe-sm text-graphite/80">
                Artist Photo
              </p>
              <div className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-charcoal/15 px-6 py-8 text-center hover:border-gold/60">
                <Upload className="h-6 w-6 text-gold" />
                <p className="font-sans text-sm text-charcoal">
                  Upload portrait
                </p>
                <p className="font-sans text-xs text-graphite/50">
                  Stored via Cloudinary in production
                </p>
              </div>
            </div>
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
              <Textarea defaultValue="The official online gallery of contemporary painter Naïa Lemaire. Discover and acquire original paintings from the Arles atelier." />
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
