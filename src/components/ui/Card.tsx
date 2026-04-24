import React from "react";
import { Card as BootstrapCard } from "react-bootstrap";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

const Card = ({ title, children, className, bodyClassName }: CardProps) => {
  return (
    <BootstrapCard className={`ui-card ${className || ""}`}>
      {title && <BootstrapCard.Header className="ui-card-header">{title}</BootstrapCard.Header>}
      <BootstrapCard.Body className={bodyClassName}>{children}</BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;

