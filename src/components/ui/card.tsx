import * as React from "react";
import { cn } from "@/lib/utils";

// Card 컴포넌트 타입 정의
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tailwind.config.jsrounded-xl tailwind.config.jsborder tailwind.config.jsbg-card tailwind.config.jstext-card-foreground tailwind.config.jsshadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardHeader 컴포넌트 타입 정의
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tailwind.config.jsflex tailwind.config.jsflex-col tailwind.config.jsspace-y-1.5 tailwind.config.jsp-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// CardTitle 컴포넌트 타입 정의
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "tailwind.config.jsfont-semibold tailwind.config.jsleading-none tailwind.config.jstracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// CardDescription 컴포넌트 타입 정의
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "tailwind.config.jstext-sm tailwind.config.jstext-muted-foreground",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// CardContent 컴포넌트 타입 정의
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tailwind.config.jsp-6 tailwind.config.jspt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// CardFooter 컴포넌트 타입 정의
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "tailwind.config.jsflex tailwind.config.jsitems-center tailwind.config.jsp-6 tailwind.config.jspt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
