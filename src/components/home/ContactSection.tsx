import { Phone, MapPin, Mail, Clock, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { buildTelLink } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-900">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
        <p className="mt-0.5 text-[15px] font-medium text-navy-900">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block rounded-xl2 p-1 transition-opacity hover:opacity-75">
        {content}
      </a>
    );
  }
  return <div className="p-1">{content}</div>;
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Get in Touch"
            subtitle="Reach us on WhatsApp for the fastest response, or call directly."
          />

          <div className="mt-8 flex flex-col gap-5">
            {siteConfig.phoneNumber && (
              <ContactRow
                icon={Phone}
                label="Phone"
                value={siteConfig.phoneNumber}
                href={buildTelLink()}
              />
            )}
            {siteConfig.whatsappNumber && (
              <ContactRow
                icon={Phone}
                label="WhatsApp"
                value={`+${siteConfig.whatsappNumber}`}
              />
            )}
            <ContactRow
              icon={MapPin}
              label="Location"
              value={siteConfig.address || "Address to be added by the business owner"}
            />
            <ContactRow
              icon={Mail}
              label="Email"
              value={siteConfig.email || "Not configured yet"}
              href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
            />
            <ContactRow
              icon={Clock}
              label="Business Hours"
              value={siteConfig.hours || "To be confirmed"}
            />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton label="Chat on WhatsApp" className="sm:min-w-[190px]" />
            {siteConfig.phoneNumber && (
              <a href={buildTelLink()} className="btn-dark sm:min-w-[160px]">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl2 border border-line">
          {siteConfig.mapsUrl ? (
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[320px] flex-1 items-end bg-navy-900/5 p-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-medium text-paper transition-colors group-hover:bg-navy-800">
                Open in Google Maps
                <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          ) : (
            <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center gap-3 bg-navy-900/[0.03] p-8 text-center">
              <MapPin className="h-8 w-8 text-ink-muted" />
              <p className="max-w-[220px] text-sm text-ink-muted">
                Map location will appear here once the business address is configured.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
