import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocalStorage } from "react-use";
import { Button } from "./Button";

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
  const timeRef = useRef(null);

  const loopGetUserInfo = (scene: string, callback: (d: User) => void) => {
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
    timeRef.current = null;
  }

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
          {user.name}
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
                  <div className="py-10 flex place-content-center">
                    <img className="w-[215px] h-[215px]" src={src} alt=""></img>
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