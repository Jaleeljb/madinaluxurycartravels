import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell, { PolicySection } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Copyright & Content Protection | Madina Car Travels",
  description:
    "Ownership, licensing and permitted use of the text, photographs, logo and other material on the Madina Car Travels website.",
};

const EFFECTIVE_DATE = "18 August 2026";
const LAST_UPDATED = "18 August 2026";

export default function CopyrightPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Copyright & Content Protection"
      intro="What on this website is original to Madina Car Travels, what is used under licence from someone else, and what you may and may not do with either."
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
    >
      <PolicySection id="ownership" number="1" title="Ownership of website content">
        <p>
          Unless otherwise stated on this page, the following elements of this website
          (madinacartravels.vercel.app) are original to Madina Car Travels and may be protected under
          the <strong>Copyright Act, 1957</strong> and other applicable Indian intellectual-property law:
        </p>
        <ul>
          <li>The written copy — headings, vehicle descriptions, service descriptions and other original text;</li>
          <li>The Madina Car Travels name, logo artwork and wordmark (see Section 4);</li>
          <li>The layout, visual design and interaction design of the website;</li>
          <li>Vehicle photographs uploaded directly by Madina Car Travels through its own admin area (as distinct from stock photographs — see Section 2); and</li>
          <li>The underlying website source code, to the extent owned or licensed by Madina Car Travels (see Section 5).</li>
        </ul>
        <p>
          This notice does not, by itself, claim ownership of any third-party material that appears on
          the site — see the next section for exactly what that is and how it is used.
        </p>
      </PolicySection>

      <PolicySection id="third-party-assets" number="2" title="Third-party assets used on this website">
        <p>
          The table below lists every category of third-party asset currently used on the site, based
          on an audit of the website&rsquo;s source code at the time of writing.
        </p>
        <div className="overflow-x-auto rounded-xl border border-card-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-charcoal text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Asset</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Licence / basis for use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border align-top">
              <tr>
                <td className="px-4 py-3">Vehicle &amp; hero photographs (stock)</td>
                <td className="px-4 py-3">Unsplash (images.unsplash.com)</td>
                <td className="px-4 py-3">Unsplash License — free to use; attribution appreciated but not legally required.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Vehicle photographs (owner-uploaded)</td>
                <td className="px-4 py-3">Uploaded by Madina Car Travels via the admin area</td>
                <td className="px-4 py-3">
                  Owned or licensed by Madina Car Travels — <em>to be confirmed by the business owner for
                  each photograph actually in use.</em>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Founder photograph (About section)</td>
                <td className="px-4 py-3">Supplied directly by Madina Car Travels</td>
                <td className="px-4 py-3">Owned by Madina Car Travels.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Logo artwork</td>
                <td className="px-4 py-3">Commissioned/supplied logo file, adapted for web use</td>
                <td className="px-4 py-3">
                  Used with the understanding that Madina Car Travels owns or holds rights to the source
                  artwork — <em>to be confirmed by the business owner (see Section 5).</em>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Typeface (Inter)</td>
                <td className="px-4 py-3">Google Fonts, self-hosted at build time</td>
                <td className="px-4 py-3">SIL Open Font License 1.1 — free for commercial use.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Icon set (Lucide)</td>
                <td className="px-4 py-3">lucide-react (open-source library)</td>
                <td className="px-4 py-3">ISC License — free for commercial use.</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Website framework &amp; libraries</td>
                <td className="px-4 py-3">Next.js, React, Framer Motion, Tailwind CSS and other open-source packages</td>
                <td className="px-4 py-3">Each used under its own open-source licence (MIT or equivalent).</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not present any of the third-party material above as original Madina Car Travels
          creative work. If any asset&rsquo;s ownership or licensing status cannot be confirmed on review,
          our practice is to replace it rather than continue using it without a clear basis.
        </p>
      </PolicySection>

      <PolicySection id="permitted-use" number="3" title="Use of our content, and what is not permitted">
        <p>
          You are welcome to browse this website, share links to it, and quote brief excerpts with
          attribution (for example, in a news article or a genuine review of our service). Beyond that,
          and unless you have our prior written permission, please do not:
        </p>
        <ul>
          <li>Copy, reproduce or republish substantial parts of this website&rsquo;s text, photographs or design elsewhere;</li>
          <li>Scrape or systematically extract website content for commercial reuse;</li>
          <li>Mirror this website or redistribute it as your own;</li>
          <li>Modify and republish our content in a way that could mislead readers about its origin;</li>
          <li>Sell or sublicense our content to others;</li>
          <li>Copy our branding, logo, or overall look-and-feel for another business; or</li>
          <li>Use our content, name or branding to create a page, listing or profile that could be mistaken for an official Madina Car Travels page.</li>
        </ul>
        <p>
          This is not an absolute prohibition on every possible use. Indian copyright law recognises
          certain permitted uses and fair-dealing exceptions — for example, for private study, criticism
          or review, reporting of current events, and certain educational purposes under Section 52 of
          the Copyright Act, 1957. Nothing in this notice is intended to override those statutory
          exceptions where they genuinely apply.
        </p>
      </PolicySection>

      <PolicySection id="logo" number="4" title="Logo and brand protection">
        <p>
          The Madina Car Travels name, wordmark and logo (the stylised &ldquo;M&rdquo; monogram combined with a
          car silhouette) identify our business. Please do not:
        </p>
        <ul>
          <li>Reproduce our logo without permission;</li>
          <li>Alter our logo in a way that misrepresents it;</li>
          <li>Use our name or logo in a way that implies affiliation, partnership or endorsement that does not exist;</li>
          <li>Use our name or logo to promote a competing car rental or travel service; or</li>
          <li>Create social-media profiles, listings or websites using our name or logo to impersonate our business.</li>
        </ul>
        <p>
          We have not verified that the Madina Car Travels name or logo is registered as a trademark
          with the Indian Trade Marks Registry. Accordingly, we do not describe it as a &ldquo;registered
          trademark&rdquo; on this page. Madina Car Travels&rsquo; name, branding and logo may nonetheless be
          protected under applicable intellectual-property and other laws, including as an unregistered
          mark and under the law of passing off.
        </p>
      </PolicySection>

      <PolicySection id="developer-rights" number="5" title="Website designer/developer rights">
        <p>
          This website was designed and developed by <strong>Shaik Jaleel Basha</strong>. Building this
          website does not, by itself, mean every item of source code, design asset, photograph, logo
          file or other material used on it is automatically owned by Madina Car Travels — ownership
          depends on the actual agreement (if any) between the business and the developer, and on the
          licence terms of any third-party assets used (see Section 2).
        </p>
        <p>The items below should be documented and confirmed between the business owner and the developer before this website is treated as fully cleared for commercial use:</p>
        <ul>
          <li>Copyright ownership of the custom website source code;</li>
          <li>Any assignment or licence agreement covering that code, from developer to business owner;</li>
          <li>Licence confirmation for any third-party stock images actually kept on the live site;</li>
          <li>Ownership/licence confirmation for the logo artwork;</li>
          <li>Confirmation of the Inter typeface&rsquo;s open-source licence terms (already satisfied — see Section 2);</li>
          <li>Confirmation of open-source licence terms for all software dependencies (already satisfied for the libraries currently in use — see Section 2);</li>
          <li>Ownership/access of the hosting account (Vercel) and database account (Upstash); and</li>
          <li>Ownership/access of the domain, once a custom domain (rather than a vercel.app subdomain) is set up.</li>
        </ul>
      </PolicySection>

      <PolicySection id="enforcement" number="6" title="Enforcement and remedies">
        <p>
          Unauthorised use of Madina Car Travels&rsquo; original content, branding or logo, in a manner that
          infringes applicable copyright or other intellectual-property rights, may entitle Madina Car
          Travels to pursue remedies available under Indian law, which — depending on the facts — can
          include:
        </p>
        <ul>
          <li>Requesting takedown or removal of the infringing material;</li>
          <li>Seeking an injunction to stop continued use;</li>
          <li>Claiming damages or an account of the infringer&rsquo;s profits;</li>
          <li>Seeking delivery-up or recovery of infringing copies, where applicable under the Copyright Act, 1957; and</li>
          <li>Criminal proceedings under Section 63 of the Copyright Act, 1957, in cases of knowing infringement or abetment of infringement, subject to that Act&rsquo;s requirements and a court&rsquo;s determination of the facts.</li>
        </ul>
        <p>
          Not every disputed or accidental use of our content amounts to actionable infringement, and
          the availability of any specific remedy depends on the circumstances, the applicable statutory
          provisions, and determination by a competent court or authority. This section describes
          potentially available remedies; it is not a guarantee that any particular remedy or penalty
          will apply to any specific case.
        </p>
      </PolicySection>

      <PolicySection id="disclaimer" number="7" title="Legal disclaimer">
        <p>
          This notice is intended to describe, in plain language, how content on this website may be
          used and protected. It is not a substitute for advice from a qualified lawyer, and it does not
          itself confirm trademark registration, copyright registration, or any other formal
          intellectual-property status. For privacy-related matters, see our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </PolicySection>
    </LegalPageShell>
  );
}
