import React, { useEffect } from "react";
import HeartIcon from "@/components/Icon/HeartIcon";
import clsx from "clsx";

import { useLocalStorage, useAsyncFn } from "react-use";
type JSONResponse = {
  data: {
    success: boolean;
  };
};

export default function CollectBtn({ q_id }) {
  const [user] = useLocalStorage("user", null);
  const openid = user?.openid;
  const [state, doFetch] = useAsyncFn(async (q_id, openid) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "post",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        action: "collectQuery",
        user_id: openid,
        q_id,
      }),
    });
    const { data }: JSONResponse = await res.json();
    return data.success;
  }, []);
  useEffect(() => {
    if (openid) {
      doFetch(q_id, openid);
    }
  }, [q_id, openid]);

  const handleCollect = async (type) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "post",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        action: type,
        user_id: openid,
        q_id,
      }),
    });
    const { data }: JSONResponse = await res.json();
    if (data.success) {
      doFetch(q_id, openid);
    }
  };
  if (!user || state.loading) {
    return null;
  }

  return (
    <div
      className={clsx(
        "text-sm rounded px-2 py-1 cursor-pointer flex items-center group",
        {
          "border-blue-500 text-blue-500 border": !state.value,
          "bg-neutral-100  dark:bg-neutral-800": state.value,
        }
      )}
      onClick={() =>
        handleCollect(!state.value ? "collectAdd" : "collectRemove")
      }
    >
      <HeartIcon
        className={clsx(
          "w-5 h-5 mr-2 text-red-500 group-hover:scale-125 ease-in duration-150",
          {
            "fill-red-500": state.value,
          }
        )}
      />
      {!state.value ? "加入收藏" : "已收藏"}
    </div>
  );
}
