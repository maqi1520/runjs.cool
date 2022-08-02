import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { useLocalStorage } from "react-use";
import { Button } from "./Button";
import ChevronDownIcon from "./Icon/ChevronDownIcon";
import LogoutIcon from "./Icon/LogoutIcon";
import ArchiveIcon from "./Icon/ArchiveIcon";
import clsx from "clsx";
import Link from "next/link";

export interface User {
  openid: string;
  name: string;
  avatar: string;
  integral: number;
  status: number;
  mp: string;
  time: number;
}

const generateString = (length: number): string =>
  Array(length)
    .fill("")
    .map((v) => Math.random().toString(36).charAt(2))
    .join("");
const getQrcode = async (scene: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "post",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      action: "qrcode",
      scene,
      page: "pages/user/user",
    }),
  });
  return res.text();
};

const getUserInfo = async (scene: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
    method: "post",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      action: "login",
      scene,
    }),
  });
  return res.json();
};

export default function LoginBtn() {
  let [isOpen, setIsOpen] = useState(false);
  let countRef = useRef(0);
  const timeRef = useRef(null);
  // 二维码失效
  const [invalid, setInvalid] = useState(false);

  const loopGetUserInfo = (scene: string, callback: (d: User) => void) => {
    if (countRef.current > 20) {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
      timeRef.current = null;
      setInvalid(true);
      return;
    }
    countRef.current++;
    timeRef.current = setTimeout(() => {
      getUserInfo(scene)
        .then((res) => {
          if (res.errcode === 0) {
            callback(res.data);
          } else {
            timeRef.current && loopGetUserInfo(scene, callback);
          }
        })
        .catch((err) => {
          console.log(err);
          timeRef.current && loopGetUserInfo(scene, callback);
        });
    }, 2000);
  };

  const [src, setSrc] = useState("");
  const [user, setUser] = useLocalStorage<User>("user", null);

  const showModal = async () => {
    const scene = generateString(10);
    getQrcode(scene).then((res) => {
      setSrc(res);
      setIsOpen(true);
      loopGetUserInfo(scene, (data) => {
        setUser(data);
        closeModal();
      });
    });
  };

  function closeModal() {
    setIsOpen(false);
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = 0;
    setInvalid(false);
    timeRef.current = null;
  }
  const handleRetry = () => {
    console.log(123);

    countRef.current = 0;
    setInvalid(false);
    showModal();
  };

  useEffect(() => {
    return () => {
      closeModal();
    };
  }, []);

  return (
    <>
      {user ? (
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-6 h-6 rounded mr-1 ml-2"
          />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center px-3 py-1 text-sm font-medium  focus:outline-none">
                {user.name}
                <ChevronDownIcon
                  className="ml-2 -mr-1 h-5 w-5  hover:text-neutral-500"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 dark:divide-neutral-50/[0.2] rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:text-neutral-400">
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/interview/collect">
                        <button
                          className={`${
                            active
                              ? "bg-blue-500 text-white"
                              : "text-gray-900 dark:text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-blue-500 hover:text-white`}
                        >
                          <ArchiveIcon
                            className={clsx("w-5 h-5 mr-2", {
                              active: "text-blue-400",
                            })}
                          />
                          我的收藏
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setUser(null)}
                        className={`${
                          active
                            ? "bg-blue-500 text-white"
                            : "text-gray-900 dark:text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <LogoutIcon
                          className={clsx("w-5 h-5 mr-2", {
                            active: "text-blue-400",
                          })}
                        />
                        退出
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <Button onClick={showModal}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          登录
        </Button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    微信扫码登录
                  </Dialog.Title>
                  <div className="py-10 flex place-content-center ">
                    <div
                      className="w-[215px] h-[215px] relative
                    "
                    >
                      <img className="w-full h-full" src={src} alt=""></img>
                      {invalid && (
                        <div
                          onClick={handleRetry}
                          className="absolute inset-0 bg-black bg-opacity-60 text-white flex justify-center items-center"
                        >
                          <div className="text-center">
                            <div>二维码已过期</div>
                            <div>点击重试</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 flex place-content-center border-t">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      取消
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
