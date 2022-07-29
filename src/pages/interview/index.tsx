import React from "react";
import { SampleLayout } from "@/components/Layout";
import { Button } from "@/components/Button";
import InterviewItem from "@/components/InterviewItem";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Question, Tag } from "@/types";
import { useAsync } from "react-use";

type JSONResponse = {
  hasNext: boolean;
  q: string;
  page: number;
  data: Question[];
  tags: Tag[];
};

export default function Interview() {
  const router = useRouter();

  const query = router.query;
  const { q = "", tagid, page = 1 } = query;

  const { loading, value } = useAsync(async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "post",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        action: "list",
        page,
        title: q,
        tagid,
      }),
    });

    const { data, tags = null, hasNext }: JSONResponse = await res.json();

    return {
      data,
      tags,
      hasNext,
    };
  }, [q, tagid, page]);

  const { data, tags, hasNext } = value || {
    data: [],
    tags: [],
    hasNext: false,
  };

  let tagmap = {};
  for (const tag of tags) {
    tagmap[tag.id] = tag.tagName;
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      router.push({
        pathname: "/interview",
        query: {
          ...query,
          q: e.target.value,
          page: 1,
        },
      });
    }
  };

  return (
    <SampleLayout title={`刷题 - 前端面试题`}>
      <section className="text-neutral-600 dark:text-slate-200 body-font overflow-hidden">
        <div className="container max-w-5xl px-5 py-16 mx-auto">
          <div className="relative">
            <span className="sr-only">Search</span>
            <input
              defaultValue={q}
              onKeyDown={onKeyDown}
              placeholder="搜一搜"
              type="text"
              className="border dark:border-neutral-50/[0.2] focus:outline outline-2 outline-blue-500 rounded  w-full px-12 py-2 pr-3 dark:bg-transparent"
            />
            <svg
              className="w-6 h-6 absolute left-3 top-2 text-neutral-400 dark:text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-4 mt-10">
            {tags.map((tag) => {
              return (
                <Link
                  key={tag.id}
                  href={{
                    pathname: "/interview",
                    query: {
                      ...query,
                      tagid: tag.id,
                      page: 1,
                    },
                  }}
                >
                  <a
                    className={clsx(
                      "flex flex-col md:flex-row items-center border dark:border-neutral-50/[0.2] p-2 rounded cursor-pointer",
                      {
                        "border-blue-500 dark:border-blue-500":
                          tag.id === +query.tagid,
                      }
                    )}
                  >
                    <img
                      src={tag.image}
                      alt={tag.tagName + "ICON"}
                      className="w-10 h-10 md:mr-2"
                    />
                    <span>{tag.tagName}</span>
                  </a>
                </Link>
              );
            })}
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {data.map((question) => {
              return (
                <InterviewItem
                  tagmap={tagmap}
                  key={question._id}
                  query={query}
                  question={question}
                />
              );
            })}
          </div>
          <div className="flex justify-between py-10 border-t border-neutral-100 dark:border-neutral-700">
            <Link
              href={{
                pathname: "/interview",
                query: {
                  ...query,
                  page: +page - 1,
                },
              }}
            >
              <a>
                <Button disabled={page === 1}>上一页</Button>
              </a>
            </Link>
            <Link
              href={{
                pathname: "/interview",
                query: {
                  ...query,
                  page: +page + 1,
                },
              }}
            >
              <a>
                <Button disabled={hasNext === false}>下一页</Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </SampleLayout>
  );
}
