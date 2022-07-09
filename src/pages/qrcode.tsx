import React from "react";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import Generator from "../components/qrcode/generator";
import Parse from "../components/qrcode/parse";

export default function QrcodePage() {
  return (
    <Layout>
      <TwoColumns>
        <Generator />
        <Parse />
      </TwoColumns>
    </Layout>
  );
}
