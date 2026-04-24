import React from "react";
import { Button as BootStrapButton } from "react-bootstrap";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  type?: "submit" | "reset" | "button" | undefined;
  title?: string;
  ariaLabel?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  variant,
  type = "button",
  title,
  ariaLabel,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <BootStrapButton
      className={className}
      variant={variant}
      type={type}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BootStrapButton>
  );
};

export default Button;
