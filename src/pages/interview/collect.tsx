import React, { useState, useEffect } from "react";
import InterviewItem from "@/components/InterviewItem";
import Error from "next/error";
import { SampleLayout } from "@/components/Layout";
import { Question, Tag } from "@/types";
import { useLocalStorage, useAsync } from "react-use";

type JSONResponse = {
  data: Question[];
  tags: Tag[];
  errorCode?: number;
};

export default function InterviewDetail() {
  const [user] = useLocalStorage("user", null);

  const { loading, value } = useAsync(async () => {
    if (user.openid) {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "post",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          action: "myCollect",
          user_id: user.openid,
        }),
      });
      const { data, tags }: JSONResponse = await res.json();
      let tagmap = {};
      for (const tag of tags) {
        tagmap[tag.id] = tag.tagName;
      }
      return { data, tagmap };
    }
    return { data: [], tagmap: {} };
  }, [user]);

  if (!user) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <SampleLayout title={`我的收藏 - 前端面试题`}>
        <section className="text-neutral-600 dark:text-slate-200 body-font overflow-hidden">
          <div className="container max-w-5xl px-5 py-16 mx-auto">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {value?.data.map((question) => {
                return (
                  <InterviewItem
                    tagmap={value?.tagmap}
                    key={question._id}
                    query={{ source: "collect" }}
                    question={question}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </SampleLayout>
    </>
  );
}
