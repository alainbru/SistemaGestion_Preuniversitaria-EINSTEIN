import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { obtenerDashboard } from "../api/dashboardApi";

function Dashboard() {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        cargarDashboard();
    }, []);

    const cargarDashboard = async () => {
        try {
            const respuesta = await obtenerDashboard();
            setDashboard(respuesta.data || {});
        } catch (error) {
            console.error("Error al cargar datos del dashboard:", error);
        }
    };

    // Datos simulados o extraídos de la API para los reportes
    const reportesRecientes = dashboard.reportes_recientes || [
        { id: 1, titulo: "Reporte Pagos", fecha: "Nov 20" },
        { id: 2, titulo: "Reporte Estudiantes", fecha: "Nov 18" },
        { id: 3, titulo: "Reporte Académico", fecha: "Nov 15" },
    ];

    return (
        <Layout>
            <header className="dashboard-header" style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>PANEL PRINCIPAL</h1>
                {usuario?.nombre_usuario && (
                    <p style={{ color: "#666" }}>
                        Bienvenido, <strong>{usuario.nombre_usuario}</strong> ({usuario.rol})
                    </p>
                )}
            </header>

            {/* Grid 2x2 alineado al boceto */}
            <div 
                className="dashboard-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "20px",
                }}
            >
                {/* Tarjeta 1: Estudiantes */}
                <DashboardCard
                    titulo="Cantidad estudiantes"
                    valor={dashboard.total_estudiantes || 1250}
                    descripcion="+5% (mes)"
                    icono="🎓"
                />

                {/* Tarjeta 2: Pagos Pendientes */}
                <DashboardCard
                    titulo="Pagos pendientes"
                    valor={dashboard.pagos_pendientes_count || 250}
                    descripcion={`S/. ${dashboard.pagos_pendientes_monto || "15,000"}`}
                    icono="💵"
                />

                {/* Tarjeta 3: Asistencia */}
                <DashboardCard
                    titulo="Asistencia"
                    valor={`${dashboard.porcentaje_asistencia || 92}%`}
                    descripcion="Promedio general"
                    icono="📊"
                />

                {/* Tarjeta 4: Reportes Recientes */}
                <div 
                    className="card-reportes" 
                    style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "20px",
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                    }}
                >
                    <h3 style={{ marginTop: 0, fontSize: "1.2rem", color: "#333" }}>
                        Reportes recientes
                    </h3>
                    
                    <ol style={{ paddingLeft: "20px", margin: "10px 0 0 0", lineHeight: "1.8" }}>
                        {reportesRecientes.map((reporte, index) => (
                            <li key={reporte.id || index} style={{ color: "#4b5563" }}>
                                <strong>{reporte.titulo}</strong> - <span style={{ fontSize: "0.9em", color: "#6b7280" }}>{reporte.fecha}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;