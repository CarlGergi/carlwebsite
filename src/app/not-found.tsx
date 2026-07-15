import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/site/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container-shell flex min-h-[80svh] flex-col items-center justify-center py-16 text-center">
        <div className="relative w-full max-w-xl">
          <Image
            src="/404-door.png"
            alt="A lone glowing doorway in darkness"
            width={1376}
            height={768}
            sizes="(max-width: 640px) 100vw, 576px"
            priority
            className="screen-media mx-auto w-full mix-blend-screen"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 75% at 50% 50%, black 50%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 75% at 50% 50%, black 50%, transparent 92%)",
            }}
          />
        </div>

        <p className="eyebrow -mt-4">404</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
          This page drifted off.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
          Whatever was here has scattered into the dark. The door back is
          still open, though.
        </p>

        <Link href="/" className="btn-primary mt-8">
          Head home
        </Link>
      </section>
    </PageShell>
  );
}
