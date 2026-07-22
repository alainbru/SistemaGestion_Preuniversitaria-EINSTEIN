import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import ActivityList from "../components/ActivityList";
import DashboardTable from "../components/DashboardTable";
import QuickActions from "../components/QuickActions";
import ActividadTimeline from "../components/ActividadTimeline";

import { listarActividades } from "../api/actividadApi";
import { obtenerDashboard } from "../api/dashboardApi";

import "../styles/Dashboard.css";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [actividades, setActividades] = useState([]);
  const [dashboard, setDashboard] = useState({});

  const cargarDashboard = useCallback(async () => {
    try {
      const respuesta = await obtenerDashboard();
      setDashboard(respuesta.data || {});
    } catch (error) {
      console.error("Error al cargar dashboard:", error);
    }
  }, []);

  const cargarActividades = useCallback(async () => {
    try {
      const respuesta = await listarActividades();
      setActividades(respuesta.data || []);
    } catch (error) {
      console.error("Error al cargar actividades:", error);
    }
  }, []);

  useEffect(() => {
    cargarDashboard();
    cargarActividades();
  }, [cargarDashboard, cargarActividades]);

  const reportesRecientes = dashboard.reportes_recientes || [
    { id: 1, titulo: "Reporte Pagos", fecha: "Nov 20" },
    { id: 2, titulo: "Reporte Estudiantes", fecha: "Nov 18" },
    { id: 3, titulo: "Reporte Académico", fecha: "Nov 15" },
  ];

  return (
    <Layout>
      <header className="dashboard-header">
        <h1>SGP EINSTEIN</h1>

        {usuario.nombre_usuario && (
          <p>
            Usuario: <strong>{usuario.nombre_usuario}</strong> ({usuario.rol})
          </p>
        )}
      </header>

      <h2>Panel Principal</h2>

      {/* TARJETAS KPI */}
      <div className="dashboard-kpis">
        <DashboardCard
          titulo="Total Alumnos"
          valor={dashboard.total_estudiantes || 0}
          icono="👨‍🎓"
          color="#667eea"
        />

        <DashboardCard
          titulo="Pagos Pendientes"
          valor={dashboard.pagos_pendientes_count || 0}
          descripcion={`S/. ${dashboard.pagos_pendientes_monto || 0}`}
          icono="💳"
          color="#f59e0b"
        />

        <DashboardCard
          titulo="Cursos Activos"
          valor={dashboard.total_cursos || 0}
          icono="📚"
          color="#10b981"
        />

        <DashboardCard
          titulo="Ingresos del Mes"
          valor={`S/. ${dashboard.ingresos || 0}`}
          icono="💰"
          color="#ec4899"
        />
      </div>

      {/* ACTIVIDADES RECIENTES */}
      <div className="dashboard-actividad">
        <ActividadTimeline actividades={actividades} />
      </div>

      {/* CONTENIDO INFERIOR */}
      <div className="dashboard-bottom">
        <ActivityList />
        <DashboardTable />
        <QuickActions />
      </div>

      {/* REPORTES RECIENTES */}
      <div className="card-reportes">
        <h3>Reportes recientes</h3>

        <ol>
          {reportesRecientes.map((reporte, index) => (
            <li key={reporte.id || index}>
              <strong>{reporte.titulo}</strong> - <span>{reporte.fecha}</span>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  );
}

export default Dashboard;