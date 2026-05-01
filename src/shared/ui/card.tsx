import * as React from "react";

import { cn } from "@/shared/lib/utils";
import Col from "./Layout/Helpers/Col";
import Text, { type TextProps } from "./Text";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Col ref={ref} className={cn("bg-green-50", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: React.ElementType;
  type?: TextProps["type"];
  weight?: TextProps["weight"];
  children: React.ReactNode;
}
const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ as = "p", type, weight, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("leading-none font-semibold tracking-tight", className)}
      {...props}
    >
      <Text as={as} type={type} weight={weight}>
        {children}
      </Text>
    </div>
  ),
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  type?: TextProps["type"];
  weight?: TextProps["weight"];
  children: React.ReactNode;
}

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ as = "p", type, weight, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-lora text-muted-foreground text-sm", className)}
      {...props}
    >
      <Text as={as} type={type} weight={weight}>
        {children}
      </Text>
    </div>
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
