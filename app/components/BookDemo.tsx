"use client";

import { useState } from "react";
import DemoModal from "./DemoModal";

// A button that opens the live-demo dialog (shared with the auto-popup).
export default function BookDemo({ className, label }: { className?: string; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>{label}</button>
      <DemoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
