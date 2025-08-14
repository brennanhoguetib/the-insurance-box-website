"use client";
import dynamic from "next/dynamic";

const DynamicUsaMap = dynamic(() => import("@/components/UsaLicensesMap"), { ssr: false });

export default function LicensesClient({ states }: { states: string[] }) {
  return <DynamicUsaMap licensedStates={states} />;
}




