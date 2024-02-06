import React, { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface IScreenContainer extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof screenVariants> {
  children: ReactNode;
}

const screenVariants = cva("", {
  variants: {
    variant: {
      full: "2xl:w-full",
      centered: "2xl:mx-auto",
    },
    size: {
      small: "xl:w-[1280px]",
      large: "mx-5 2xl:mx-auto 2xl:w-[1624px]",
    },
  },
  defaultVariants: {
    variant: "centered",
    size: "large",
  },
});

export function ScreenContainer({ children, className, variant, size, ...rest }: IScreenContainer) {
  return (
    <div className={cn(screenVariants({ variant, size, className }), className)} {...rest}>
      {children}
    </div>
  );
}
