"use client";

import React, { ComponentProps, FC } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton: FC<FormSubmitButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn-primary btn ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-dots" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
