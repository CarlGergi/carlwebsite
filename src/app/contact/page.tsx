import { ContactSection } from "@/components/site/contact-section";
import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";

export default function ContactPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Contact"
        title="Get in touch."
        description="Whether it's about an internship, a project, or a collaboration — feel free to reach out."
      />
      <ContactSection />
    </PageShell>
  );
}
