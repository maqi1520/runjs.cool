import Link from "next/link";
import { SampleLayout } from "../components/Layout";
import { tools } from "@/tools";

export default function HomePage() {
  return (
    <SampleLayout>
      <div className="grid md:grid-cols-3 gap-5 p-5 container max-w-5xl mx-auto">
        {tools.map((tool) => {
          return (
            <Link href={tool.link} key={tool.name}>
              <a className="border dark:border-neutral-50/[0.2] rounded-lg p-5 font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500">
                {tool.name}
              </a>
            </Link>
          );
        })}
      </div>
    </SampleLayout>
  );
}
