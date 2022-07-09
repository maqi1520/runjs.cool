import Link from "next/link";
import { Layout } from "../components/Layout";
import { tools } from "@/tools";

export default function HomePage() {
  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-5 p-5 max-w-screen-lg">
        {tools.map((tool) => {
          return (
            <Link href={tool.link} key={tool.name}>
              <a className="border rounded-lg p-5 font-bold hover:bg-zinc-100">
                {tool.name}
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
