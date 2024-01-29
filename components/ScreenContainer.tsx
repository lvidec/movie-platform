import React, { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface IScreenContainer extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof screenVariants> {
  children: ReactNode;
  outerBackground?: string;
}

// Add more stylings/variants if needed
const screenVariants = cva("", {
  variants: {
    variant: {
      full: "2xl:w-full",
      centered: "2xl:mx-auto",
    },
    size: {
      small: "xl:w-[1280px]",
      large: "mx-5 2xl:mx-auto 2xl:w-[1480px]",
    },
  },
  defaultVariants: {
    variant: "centered",
    size: "large",
  },
});

// Getting the types of a variant in screenVariants so that type assignments are dynamic
type ExtractedVariants = NonNullable<
  typeof screenVariants extends (props: { variant: infer V }) => unknown ? V : never
>;

export function ScreenContainer({ children, outerBackground, className, variant, size, ...rest }: IScreenContainer) {
  const defaultVariant: ExtractedVariants = variant ? variant : "centered";

  return (
    <OuterScreenWrapper variant={defaultVariant} outerBackground={outerBackground}>
      <div className={cn(screenVariants({ variant, size, className }), className)} {...rest}>
        {children}
      </div>
    </OuterScreenWrapper>
  );
}

interface IOuterScreenWrapperProps {
  variant: ExtractedVariants;
  outerBackground: string | undefined;
  children: ReactNode;
}

const OuterScreenWrapper = ({ variant, outerBackground, children }: IOuterScreenWrapperProps) => {
  return variant === "centered" && outerBackground ? (
    <div style={{ backgroundColor: outerBackground }}>{children}</div>
  ) : (
    <>{children}</>
  );
};
