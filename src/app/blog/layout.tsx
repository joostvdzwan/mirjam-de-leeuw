import "./kantlijn.css";
import BookingDialog from "@/components/kantlijn/BookingDialog";
import { KANTLIJN } from "@/lib/kantlijn/config";
import content from "@/content/nl.json";

/** The shared site header and footer come from the root layout; this adds the blog's own world. */
export default function KantlijnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="kantlijn">
      {children}
      <BookingDialog
        replyTime={KANTLIJN.replyTime}
        safety={KANTLIJN.bookingSafety}
        fallbackEmail={content.footer.email}
      />
    </div>
  );
}
