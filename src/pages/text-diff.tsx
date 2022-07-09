import { Layout } from "../components/Layout";

import dynamic from "next/dynamic";
const DiffEditor = dynamic(() => import("@/components/DiffEditor"), {
  ssr: false,
});

export default function TextDiffPage() {
  return (
    <Layout>
      <DiffEditor />
    </Layout>
  );
}
