import clsx from "clsx"

export const ErrorMessage: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { message?: string }
> = ({ message, className, ...props }) => {
  if (!message) return null
  return (
    <div
      {...props}
      className={clsx(
        `text-white bg-red-500 rounded-lg px-3 py-3 flex`,
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline mt-[2px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex-1 pl-2">{message}</div>
    </div>
  )
}
