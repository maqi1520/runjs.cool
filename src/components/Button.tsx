import clsx from "clsx";
import React from "react";
import { copyTextToClipboard } from "../utils/copy";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        `bg-transparent border-blue-500 border rounded px-4 py-2 text-sm inline-flex items-center text-blue-500 active:bg-blue-500 active:text-white`
      )}
    >
      {children}
    </button>
  );
};

export const CopyButton: React.FC<{
  getValue: () => string;
  className?: string;
}> = ({ getValue, className }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      onClick={() => {
        copyTextToClipboard(getValue());
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
      className={clsx(copied && `text-green-600`, className)}
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M857.373 65.29H469.604c-34.21 0-62.044 27.833-62.044 62.043v10.34h-63.076c-25.993 0-48.229 16.347-57.001 39.295H166.627c-34.21 0-62.043 27.832-62.043 62.043v657.655c0 34.21 27.833 62.043 62.043 62.043h550.115c34.21 0 62.043-27.833 62.043-62.043V847.03h78.588c34.21 0 62.043-27.832 62.043-62.043V127.333c0-34.21-27.833-62.043-62.043-62.043zm-512.89 113.746h194.403c10.834 0 19.647 8.813 19.647 19.646 0 10.834-8.814 19.647-19.647 19.647H344.484c-10.834 0-19.647-8.814-19.647-19.647 0-10.833 8.813-19.646 19.647-19.646zm392.94 717.63c0 11.403-9.278 20.68-20.68 20.68H166.626c-11.404 0-20.681-9.277-20.681-20.68V239.01c0-11.403 9.277-20.681 20.681-20.681h120.112c8.197 24.027 30.977 41.362 57.744 41.362h194.402c26.768 0 49.547-17.335 57.744-41.362h120.112c11.403 0 20.681 9.278 20.681 20.68v657.656zm140.631-111.678c0 11.403-9.278 20.681-20.681 20.681h-78.588V239.011c0-34.21-27.833-62.043-62.043-62.043H595.887c-8.772-22.948-31.008-39.294-57.002-39.294h-89.964v-10.34c0-11.405 9.279-20.682 20.683-20.682h387.769c11.403 0 20.681 9.277 20.681 20.681v657.655zM620.597 334.253H260.75c-11.422 0-20.681 9.26-20.681 20.68s9.259 20.682 20.68 20.682h359.85c11.421 0 20.681-9.26 20.681-20.681s-9.26-20.681-20.682-20.681zm0 119.949H260.75c-11.422 0-20.681 9.26-20.681 20.68 0 11.422 9.259 20.682 20.68 20.682h359.85c11.421 0 20.681-9.26 20.681-20.681 0-11.42-9.26-20.681-20.682-20.681zm-179.923 119.95H260.749c-11.422 0-20.681 9.26-20.681 20.68 0 11.422 9.259 20.682 20.68 20.682h179.926c11.42 0 20.68-9.26 20.68-20.681 0-11.422-9.26-20.681-20.68-20.681z" />
      </svg>

      <span className={clsx(`ml-1`)}>{copied ? "已复制!" : "复制"}</span>
    </Button>
  );
};
