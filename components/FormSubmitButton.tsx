"use client";

import { ComponentProps } from "react";
// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
        children: React.ReactNode;
        className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
    children, 
    className,
    ...props
} : FormSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button 
        {...props}
        className={`btn btn-primary btn-block ${className}`}
        type="submit" 
        disabled={pending}>

        {pending && <i className="fa fa-spinner fa-spin"></i>}
        {children}
        </button>
    )
}
