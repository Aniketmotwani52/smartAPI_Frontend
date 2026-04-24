
interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
  return (
    <div className={`page-header ${className || ""}`}>
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle mb-0">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
