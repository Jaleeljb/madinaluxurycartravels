import type { Metadata } from "next";
import Link from "next/link";
import LegalPageShell, { PolicySection } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Madina Car Travels",
  description:
    "How Madina Car Travels collects, uses and protects information from visitors to this website, including bookings made over WhatsApp.",
};

const EFFECTIVE_DATE = "18 August 2026";
const LAST_UPDATED = "18 August 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This page explains what information this website collects, why, and how it is handled. Please read it before submitting any personal information, including through the WhatsApp booking links on this site."
      effectiveDate={EFFECTIVE_DATE}
      lastUpdated={LAST_UPDATED}
    >
      <PolicySection id="introduction" number="1" title="Introduction">
        <p>
          This Privacy Policy applies to the website operated by <strong>Madina Car Travels</strong>, a
          car rental and travel service based at Shadi Khana Grounds, Narasaraopet, Palnadu District,
          Andhra Pradesh – 522601, India We us(&ldquo;<strong>Madina Car Travels</strong>&rdquo;), and
          available at <strong>madinacartravels.vercel.app</strong> the Website.
        </p>
        <p>
          This Policy covers the Website itself the pages a visitor loads in their browser and the
          information exchanged when a visitor uses the WhatsApp or phone links on the Website to contact
          us. It does not cover WhatsApp&rsquo;s own app or platform, which is operated by Meta and governed
          by Meta&rsquo;s own privacy terms (see Section 7).
        </p>
        <p>
          By browsing the Website or contacting us through it, you acknowledge that you have had the
          opportunity to read this Policy. If you do not agree with it, please do not submit personal
          information to us through the Website.
        </p>
      </PolicySection>

      <PolicySection id="legal-framework" number="2" title="Legal framework and current status">
        <p>
          We aim to align our data-handling practices with applicable Indian law, principally the{" "}
          <strong>Digital Personal Data Protection Act, 2023</strong> (&ldquo;DPDP Act&rdquo;), the{" "}
          <strong>Digital Personal Data Protection Rules, 2025</strong> (&ldquo;DPDP Rules&rdquo;), and the{" "}
          <strong>Information Technology Act, 2000</strong> together with the Information Technology
          (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information)
          Rules, 2011 (&ldquo;SPDI Rules&rdquo;).
        </p>
        <p>
          The DPDP Rules were notified on 13 November 2025, alongside a notification bringing certain
          provisions of the DPDP Act into force (including the Act&rsquo;s definitions and the provisions
          establishing the Data Protection Board of India). However, most of the Act&rsquo;s substantive
          obligations including the core consent and notice framework, most data principal rights,
          breach notification duties and provisions specific to significant data fiduciaries come
          into force in phases: provisions relating to consent managers commence on 13 November 2026,
          and the remaining provisions are scheduled to commence on 13 May 2027.
        </p>
        <p>
          <strong>In practical terms:</strong> as of the &ldquo;Last updated&rdquo; date above, the DPDP Act&rsquo;s full
          compliance regime is not yet in force for most obligations. Until it is, the IT Act, 2000
          (particularly Section 43A) and the SPDI Rules, 2011 remain the operative statutory framework
          governing reasonable security practices for sensitive personal data in India. We describe our
          practices below as current commitments and, where they anticipate the DPDP Act, as voluntary
          preparation ahead of that Act&rsquo;s full commencement not as claims that every DPDP obligation
          is already legally mandatory for us today. We will update this Policy as further provisions
          come into force.
        </p>
      </PolicySection>

      <PolicySection id="information-we-collect" number="3" title="Information we collect">
        <h3>Information you provide to us</h3>
        <p>
          The Website itself does not contain a contact form, booking form, account sign up, or any
          other input field that transmits data to our servers. Every &ldquo;Book&rdquo; or &ldquo;Reserve on
          WhatsApp&rdquo; action on the Website opens a pre filled WhatsApp conversation in your own
          WhatsApp app, addressed to our business WhatsApp number. If you choose to send that message,
          the information it contains which may include your name (as shown in your WhatsApp
          profile), phone number, the vehicle you are interested in, and any dates, locations or trip
          details you type is sent to us <strong>through WhatsApp</strong>, not through this Website&rsquo;s
          servers. See Section 7 for more on how this works.
        </p>
        <p>
          Similarly, the &ldquo;Call us&rdquo; link opens your device&rsquo;s own phone dialler; any conversation
          that follows happens over a normal phone call, which we do not record through this Website.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          The Website does not run analytics, advertising, or tracking scripts, and does not set
          cookies for ordinary visitors (see Section 14). The one exception is a single authentication
          cookie used only by the business owner to log in to the password protected fleet-management
          area at <code>/admin</code>; ordinary visitors browsing the public site never receive this
          cookie.
        </p>
        <p>
          The Website stores one item in your browser&rsquo;s local storage your selected display
          language (English, Hindi or Telugu) so the site remembers your preference on your next
          visit. This value stays on your device; it is not transmitted to us or to any third party.
        </p>
        <p>
          Our hosting provider, Vercel, may generate standard technical server logs (such as IP address,
          request timestamps and basic device/browser information) purely as part of operating its
          infrastructure and content delivery network. This Website does not build any custom analytics
          or visitor-profiling on top of those logs. The exact retention period and configuration of
          Vercel&rsquo;s platform-level logs is a hosting-provider setting rather than something this
          Website&rsquo;s source code controls —{" "}
          <em>to be confirmed by the website owner from the Vercel account&rsquo;s own settings.</em>
        </p>
        <h3>Information we do not collect</h3>
        <p>
          We do not knowingly collect payment card details, government ID numbers, precise device
          location, biometric information, or other sensitive personal data through the Website. We do
          not use cookies or scripts for advertising, remarketing, or cross-site tracking.
        </p>
      </PolicySection>

      <PolicySection id="purpose" number="4" title="Purpose of processing">
        <p>Where we do handle information (principally, information you choose to send us over WhatsApp or by phone), we use it only for legitimate business purposes such as:</p>
        <ul>
          <li>Responding to enquiries about our vehicles, pricing and availability;</li>
          <li>Arranging and confirming local, outstation or airport-transfer bookings;</li>
          <li>Coordinating pickup with the assigned driver;</li>
          <li>Customer support relating to an existing or prospective booking;</li>
          <li>Keeping basic business records (for example, of bookings and payments) where reasonably necessary for accounting or dispute resolution; and</li>
          <li>Complying with applicable legal obligations, where they apply.</li>
        </ul>
        <p>
          We do not use information you send us for purposes unrelated to your enquiry or booking, and
          we do not sell personal information to third parties.
        </p>
      </PolicySection>

      <PolicySection id="consent" number="5" title="Consent and lawful basis">
        <p>
          Because booking enquiries are voluntary you choose to open WhatsApp or dial our number and
          choose what to send us the information involved is provided with your knowledge and
          consent at the point you send it. Where the DPDP Act&rsquo;s consent framework is in force and
          applicable, we intend to rely on consent, or another lawful basis recognised by that Act (such
          as processing necessary to respond to a request you have made), as the basis for processing.
        </p>
        <p>
          You are not obliged to send us any particular piece of information. However, some details
          such as pickup location, travel dates and a contact number are practically necessary for us
          to confirm and fulfil a booking; declining to share them may mean we are unable to process
          your request.
        </p>
        <p>
          Because our own systems do not store WhatsApp conversation content, &ldquo;withdrawing consent&rdquo;
          in practice means simply not sending further messages, and/or asking us directly (see Section
          13) to delete any specific information you have previously shared that we hold in our own
          records.
        </p>
      </PolicySection>

      <PolicySection id="data-sharing" number="6" title="Data sharing">
        <p>We do not sell personal information. We may share the limited information involved in a booking with:</p>
        <ul>
          <li>
            <strong>Our drivers/service personnel</strong> - so they know who to collect, from where, and when
          </li>
          <li>
            <strong>Meta Platforms, Inc. (WhatsApp)</strong> - inherently, whenever a booking or enquiry is conducted over WhatsApp, since that conversation runs on WhatsApp&rsquo;s platform (see Section 7)
          </li>
          <li>
            <strong>Our hosting and infrastructure providers</strong> (currently Vercel for website hosting, and Upstash for the database that stores our vehicle listings) - who process data on our behalf to keep the Website running
          </li>
          <li>
            <strong>Government or law enforcement authorities</strong>, only where we are legally required to disclose information to them.
          </li>
        </ul>
        <p>
          We do not currently use a separate CRM, payment gateway, or marketing platform that would
          receive customer information. If that changes, we will update this Policy accordingly.
        </p>
      </PolicySection>

      <PolicySection id="whatsapp" number="7" title="WhatsApp booking privacy">
        <p>
          Booking and enquiry buttons on this Website (Reserve on WhatsApp, &ldquo;Book&rdquo;, &ldquo;Message us on
          WhatsApp&rdquo;) open a pre-addressed conversation in the WhatsApp application, with a suggested
          message already typed in. Nothing is sent automatically you choose whether to review, edit
          and send that message.
        </p>
        <p>Once you send a message on WhatsApp, please note:</p>
        <ul>
          <li>The conversation takes place on WhatsApp&rsquo;s own platform, operated by Meta Platforms, Inc.</li>
          <li>That message, and any information within it, is processed under WhatsApp&rsquo;s own privacy policy and terms of service, not this one</li>
          <li>Madina Car Travels does not control how WhatsApp itself stores, encrypts, backs up or otherwise processes messages on its platform</li>
          <li>
            We recommend reviewing WhatsApp&rsquo;s privacy policy directly at{" "}
            <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              whatsapp.com/legal/privacy-policy
            </a>{" "}
            before sending sensitive information
          </li>
          <li>We suggest sharing only what is needed to arrange your trip (name, contact number, pickup/drop details, dates) and avoiding unnecessary sensitive information (such as ID or financial details) over chat.</li>
        </ul>
        <p>
          On our side, once we receive a booking message, we use the information in it only for the
          purposes described in Section 4.
        </p>
      </PolicySection>

      <PolicySection id="retention" number="8" title="Data retention">
        <p>
          We keep booking-related information only for as long as reasonably necessary to fulfil the
          booking, handle any related support or dispute, and meet any applicable accounting or legal
          record-keeping obligation. We do not currently operate an automated retention/deletion
          schedule for WhatsApp conversation history, since that history resides on the WhatsApp
          platform (and on the respective devices), not on our servers.
        </p>
        <div className="legal-note">
          <strong>Owner action required:</strong> a specific retention period for business records
          (e.g. booking messages, driver logs, payment records) has not yet been formally defined. This
          should be decided by the business owner and documented here.
        </div>
      </PolicySection>

      <PolicySection id="security" number="9" title="Data security">
        <p>We use reasonable technical safeguards appropriate to how this Website is actually built, including:</p>
        <ul>
          <li>HTTPS/TLS encryption for all traffic to and from the Website</li>
          <li>A password-protected admin area, gated by an authentication cookie that is set to be HTTP-only and (in production) transmitted only over HTTPS</li>
          <li>No public exposure of the database used to store vehicle listings it is accessed only from server-side code, using credentials that are not shipped to the browser</li>
          <li>Keeping the Website&rsquo;s underlying software dependencies reasonably up to date.</li>
        </ul>
        <p>
          No method of transmission or storage is completely secure, and we do not claim that the
          Website is &ldquo;100% secure&rdquo; or immune to compromise. We take reasonable, proportionate steps to
          protect information handled through the Website against unauthorised access, alteration or
          loss.
        </p>
      </PolicySection>

      <PolicySection id="breach" number="10" title="Personal data breach">
        <p>
          If we become aware of a breach affecting personal data that we hold, we will take reasonable
          steps to investigate, contain and remediate it. Where the DPDP Act&rsquo;s breach-notification
          provisions are in force and apply to us, we intend to follow the notification procedures and
          timelines they prescribe, including notifying the Data Protection Board of India and affected
          individuals where required. As explained in Section 2, those provisions are not yet fully in
          force at the time of writing we do not represent a specific notification timeline as a
          present legal guarantee, and this section will be updated once those obligations formally
          apply to us.
        </p>
      </PolicySection>

      <PolicySection id="children" number="11" title="Children's data">
        <p>
          This Website is intended for general audiences seeking car rental and travel services, and is
          not directed at children. We do not knowingly seek to collect personal data from children
          through the Website. We do not currently operate an age-verification mechanism, and we do not
          make claims about our ability to verify the age of any visitor. If a parent or guardian
          believes a child has shared personal information with us, please contact us using the details
          in Section 13 and we will address it.
        </p>
      </PolicySection>

      <PolicySection id="your-rights" number="12" title="Your rights">
        <p>
          Subject to the phased commencement described in Section 2, the DPDP Act envisages a set of
          rights for individuals (&ldquo;Data Principals&rdquo;) regarding their personal data, including rights to:
        </p>
        <ul>
          <li>Obtain a summary of personal data we hold about you and how it is being processed</li>
          <li>Request correction or updating of inaccurate or incomplete personal data</li>
          <li>Request erasure of personal data that is no longer necessary for the purpose it was collected for</li>
          <li>Withdraw consent, where processing is based on consent</li>
          <li>Register a grievance regarding how your personal data is handled and</li>
          <li>Nominate another individual to exercise these rights on your behalf in the event of death or incapacity, where applicable.</li>
        </ul>
        <p>
          Where our own records include information about you (for example, information you sent us
          over WhatsApp that we have kept for booking or accounting purposes), you may contact us using
          the details in Section 13 to make any of the above requests, and we will respond within a
          reasonable time. We have not appointed a dedicated Data Protection Officer, as our current
          scale of operations and the applicable law in force do not yet require one; requests can be
          made directly to the contact below.
        </p>
      </PolicySection>

      <PolicySection id="grievance-officer" number="13" title="Grievance officer / privacy contact">
        <p>
          For privacy-related questions, requests, or complaints about how this Website or Madina Car
          Travels handles information, please contact:
        </p>
        <div className="legal-note space-y-1">
          <p><strong>Privacy contact name:</strong> SK Mohammad YASEEN</p>
          <p><strong>Phone:</strong> +91 63013 53952</p>
          <p><strong>Email:</strong> vk.venkat952@gmail.com</p>
          <p><strong>Address:</strong> Shadi Khana Grounds, Narasaraopet, Palnadu District, Andhra Pradesh – 522601, India</p>
          <p><strong>Grievance submission procedure:</strong> e.g. &ldquo;email the address above with the subject line &lsquo;Privacy Request&rsquo;&rdquo;</p>
        </div>
        <p>
          We do not currently publish a dedicated privacy email address on the Website the phone
          number above is the only contact channel confirmed at the time of writing. We recommend the
          business owner set up and publish an email address for privacy/grievance correspondence, so
          requests can be made in writing.
        </p>
      </PolicySection>

      <PolicySection id="cookies" number="14" title="Cookies and local storage">
        <p>This Website uses browser storage in two limited ways:</p>
        <ul>
          <li>
            <strong>One essential cookie</strong>, used only within the password protected admin area at{" "}
            <code>/admin</code>, to keep the business owner logged in for up to 8 hours. It is not set
            for ordinary visitors browsing the public pages of the Website, and it is not used for
            tracking, analytics or advertising.
          </li>
          <li>
            <strong>Local storage (not a cookie)</strong>, used to remember your chosen display language
            on this device. This value never leaves your browser.
          </li>
        </ul>
        <p>
          We do not use analytics cookies, advertising/marketing cookies, or third-party tracking
          cookies. Because the Website does not currently set non-essential cookies for visitors, it
          does not display a cookie-consent banner the admin cookie above is strictly necessary for
          that feature to function and falls within the &ldquo;essential cookie&rdquo; category that is generally
          exempt from separate consent requirements. If analytics, advertising or other non-essential
          tracking is added to the Website in the future, this section and an appropriate consent
          mechanism will be added before that technology goes live.
        </p>
      </PolicySection>

      <PolicySection id="third-party-links" number="15" title="Third-party links and services">
        <p>
          The Website links out to WhatsApp (<code>wa.me</code>) and to your device&rsquo;s phone dialler
          (<code>tel:</code> links). Once you leave the Website through one of these links, your
          interaction is governed by that third party&rsquo;s own terms and privacy practices, not this
          Policy. We are not responsible for the content or privacy practices of WhatsApp/Meta or of
          your device&rsquo;s own phone application.
        </p>
        <p>
          Photographs of vehicles shown on the Website are, at the time of writing, sourced either from
          Unsplash (used under the Unsplash License) or uploaded directly by the business owner through
          the admin area. See our{" "}
          <Link href="/copyright">Copyright &amp; Content Protection Notice</Link> for more on
          third-party content used on this Website.
        </p>
      </PolicySection>

      <PolicySection id="data-transfers" number="16" title="Data transfers">
        <p>
          The Website is hosted on Vercel, and its vehicle-listing database runs on Upstash both are
          cloud infrastructure providers that operate global networks, which can mean data is processed
          on servers outside India depending on the specific region configured for the account. We have
          not independently verified the exact processing region(s) currently configured for these
          services from the Website&rsquo;s source code alone.
        </p>
        <p>
          <em>To be confirmed by the website owner:</em> the specific hosting/database region(s) in use,
          so that this section can accurately state whether, and where, personal data is processed
          outside India, consistent with the DPDP Act&rsquo;s cross-border transfer provisions once those
          provisions are in force.
        </p>
      </PolicySection>

      <PolicySection id="changes" number="17" title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time for example, if we add new features to
          the Website, change service providers, or as further provisions of the DPDP Act come into
          force. We will revise the &ldquo;Last updated&rdquo; date at the top of this page whenever we do. We
          encourage you to review this page periodically.
        </p>
      </PolicySection>

      <PolicySection id="disclaimer" number="18" title="Legal disclaimer">
        <p>
          This Privacy Policy is intended to describe, in plain language, how this Website and Madina
          Car Travels handle information. It is not a substitute for advice from a qualified lawyer.
          This Policy is designed to align with applicable Indian privacy requirements, subject to legal
          review and to the actual, current implementation of the Website described above it is not a
          claim of full legal compliance, government approval, or certification of any kind.
        </p>
      </PolicySection>
    </LegalPageShell>
  );
}
