import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Alert 컴포넌트의 variant 옵션 설정
const alertVariants = cva(
  "tailwind.config.jsrelative tailwind.config.jsw-full tailwind.config.jsrounded-lg tailwind.config.jsborder tailwind.config.jspx-4 tailwind.config.jspy-3 tailwind.config.jstext-sm [&>svg+div]:tailwind.config.jstranslate-y-[-3px] [&>svg]:tailwind.config.jsabsolute [&>svg]:tailwind.config.jsleft-4 [&>svg]:tailwind.config.jstop-4 [&>svg]:tailwind.config.jstext-foreground [&>svg~*]:tailwind.config.jspl-7",
  {
    variants: {
      variant: {
        default: "tailwind.config.jsbg-background tailwind.config.jstext-foreground",
        destructive:
          "tailwind.config.jsborder-destructive/50 tailwind.config.jstext-destructive dark:tailwind.config.jsborder-destructive [&>svg]:tailwind.config.jstext-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Alert 컴포넌트의 타입 정의
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

// AlertTitle 컴포넌트의 타입 정의
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "tailwind.config.jsmb-1 tailwind.config.jsfont-medium tailwind.config.jsleading-none tailwind.config.jstracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// AlertDescription 컴포넌트의 타입 정의
interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tailwind.config.jstext-sm [&_p]:tailwind.config.jsleading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
