import { useEffect, useState } from "react";
import { isWorkboxPresent } from "@/utils/workbox";
import clsx from "clsx";

export function SWUpdatePopup() {
  const [visible, setVisible] = useState(false);

  const handleRefresh = () => {
    const wb = window.workbox;
    if (isWorkboxPresent) {
      wb.addEventListener("controlling", (event) => {
        window.location.reload();
      });
      wb.messageSkipWaiting();
      setVisible(false);
    } else {
      alert("Workbox is not present");
    }
  };

  useEffect(() => {
    if (isWorkboxPresent) {
      const wb = window.workbox;

      wb.addEventListener("waiting", () => {
        setVisible(true);
      });

      wb.register();
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className={clsx(
        "fixed bottom-5 right-5",
        "animate-in slide-in-from-right",
        "p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md "
      )}
    >
      <h5 className="mb-2 text-xl font-medium tracking-tight text-neutral-900 ">
        New updates available!
      </h5>

      <div className="flex mt-4 space-x-3 lg:mt-4">
        <button
          aria-label="Refresh content"
          onClick={handleRefresh}
          className="inline-flex items-center py-1 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
        >
          Refresh
        </button>
        <button
          aria-label="Close"
          onClick={() => setVisible(false)}
          className="inline-flex items-center py-1 px-3 text-sm font-medium text-center text-neutral-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 "
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
