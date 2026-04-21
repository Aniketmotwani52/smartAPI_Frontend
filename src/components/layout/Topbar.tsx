const Topbar = () => {
  return (
    <header className="app-topbar d-flex align-items-center justify-content-between border-bottom bg-white px-4 py-3">
      <div className="d-flex align-items-center gap-3">
        <div>
          <p className="text-uppercase text-muted small mb-1">Platform Shell</p>
          <h2 className="h5 mb-0">API Forwarding Workspace</h2>
        </div>
      </div>

      <span className="badge rounded-pill text-bg-light border text-dark">
        MVP Layout
      </span>
    </header>
  );
};

export default Topbar;
