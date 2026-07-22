function DashboardCard({ titulo, valor, descripcion, icono }) {
  return (
    <div 
      className="dashboard-card"
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: "0 0 12px 0", color: "#6b7280", fontSize: "0.95rem" }}>
            {titulo}
          </p>
          <p style={{ margin: "0 0 8px 0", fontSize: "2rem", fontWeight: "bold", color: "#1f2937" }}>
            {valor}
          </p>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#9ca3af" }}>
            {descripcion}
          </p>
        </div>
        <div style={{ fontSize: "2.5rem" }}>
          {icono}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;