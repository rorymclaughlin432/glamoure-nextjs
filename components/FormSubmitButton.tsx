"use client";

import { ComponentProps, useState } from "react";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPending(true);
    if (props.onClick) {
      await props.onClick(event);
    }
    setIsPending(false);
  };

  return (
    <button
      {...props}
      className={`btn btn-primary btn-block ${className}`}
      type="submit"
      disabled={isPending}
      onClick={handleClick}
    >
      {isPending && <i className="fa fa-spinner fa-spin"></i>}
      {children}
    </button>
  );
}