import { CheckCircle2, XCircle, KeyRound, Globe, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function AdminSettingsPage() {
  const blobConfigured = !!process.env.BLOB_READ_WRITE_TOKEN;
  const adminEmail = process.env.ADMIN_EMAIL || "Not configured";

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-900">Settings</h1>
      <p className="mt-1 text-sm text-ink-muted">
        These values come from environment variables, not this page — that keeps secrets out of the
        database and out of the admin UI itself. Update them in <code className="rounded bg-navy-900/[0.06] px-1.5 py-0.5">.env.local</code>{" "}
        (development) or your Vercel project&apos;s Environment Variables (production), then redeploy.
      </p>

      <div className="mt-6 card p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
          <Globe className="h-5 w-5 text-ink-muted" />
          Business Contact
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SettingRow label="Business Name" value={siteConfig.businessName} />
          <SettingRow label="Site URL" value={siteConfig.siteUrl} envVar="NEXT_PUBLIC_SITE_URL" />
          <SettingRow label="Phone Number" value={siteConfig.phoneNumber} envVar="NEXT_PUBLIC_PHONE_NUMBER" />
          <SettingRow
            label="WhatsApp Number"
            value={siteConfig.whatsappNumber}
            envVar="NEXT_PUBLIC_WHATSAPP_NUMBER"
          />
          <SettingRow label="Email" value={siteConfig.email} envVar="NEXT_PUBLIC_BUSINESS_EMAIL" />
          <SettingRow label="Address" value={siteConfig.address} envVar="NEXT_PUBLIC_BUSINESS_ADDRESS" />
          <SettingRow label="Business Hours" value={siteConfig.hours} envVar="NEXT_PUBLIC_BUSINESS_HOURS" />
          <SettingRow label="Google Maps Link" value={siteConfig.mapsUrl} envVar="NEXT_PUBLIC_GOOGLE_MAPS_URL" />
        </dl>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
          <KeyRound className="h-5 w-5 text-ink-muted" />
          Admin Account
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <SettingRow label="Admin Email" value={adminEmail} envVar="ADMIN_EMAIL" />
          <SettingRow label="Admin Password" value="•••••••• (hashed)" envVar="ADMIN_PASSWORD_HASH" />
        </dl>
        <p className="mt-4 text-sm text-ink-muted">
          To change the password, run{" "}
          <code className="rounded bg-navy-900/[0.06] px-1.5 py-0.5">npm run hash-password -- &quot;YourNewPassword&quot;</code>{" "}
          locally and paste the printed hash into <code className="rounded bg-navy-900/[0.06] px-1.5 py-0.5">ADMIN_PASSWORD_HASH</code>.
        </p>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
          <MessageCircle className="h-5 w-5 text-ink-muted" />
          Image Storage
        </h2>
        <div className="mt-4 flex items-center gap-2.5 text-sm">
          {blobConfigured ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-ink-soft">Vercel Blob is configured — image uploads are enabled.</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-danger" />
              <span className="text-ink-soft">
                Not configured. Add <code className="rounded bg-navy-900/[0.06] px-1 py-0.5">BLOB_READ_WRITE_TOKEN</code> from
                your Vercel project&apos;s Storage tab to enable image uploads.
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl2 border border-gold-500/25 bg-gold-500/10 p-5 text-sm text-navy-900">
        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        <p>
          Per-car phone and WhatsApp numbers can override these business-wide defaults — set them
          on an individual vehicle from its edit page under Manage Cars.
        </p>
      </div>
    </div>
  );
}

function SettingRow({ label, value, envVar }: { label: string; value: string; envVar?: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-navy-900">
        {value || <span className="italic text-ink-muted">Not set</span>}
      </dd>
      {envVar && <dd className="mt-0.5 font-mono text-[11px] text-ink-muted">{envVar}</dd>}
    </div>
  );
}
