"use client";

import dynamic from "next/dynamic";

const Invitation = dynamic(
  () => import("./invitation").then((mod) => mod.Invitation),
  {
    ssr: false,
    loading: () => <div className="wedding-loading" aria-hidden />,
  },
);

export function InvitationLoader() {
  return <Invitation />;
}