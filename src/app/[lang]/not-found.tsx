import Link from "next/link";
import { LogoMark } from "@/components/Logo";

// Rendered inside the [lang] layout; the locale isn't available here, so show both languages.
export default function NotFound() {
  return (
    <section className="blueprint flex min-h-[80vh] items-center bg-ink pt-[4.5rem] text-white">
      <div className="container-x text-center">
        <LogoMark className="mx-auto h-20 w-20 text-brand" />
        <p className="display mt-8 text-8xl text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">Page not found · الصفحة غير موجودة</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/en" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/ar" className="btn btn-ghost-light">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
