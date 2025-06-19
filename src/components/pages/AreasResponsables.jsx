import { useGetMedicamentos } from "../../hooks/useGetMedicamentos";
import "../../styles/Medicamentos.css";
import MedicamentoCard from "../ui/medicamento-card";

const Medicamentos = () => {
  const {result, loading, error} = useGetMedicamentos()

  return (
    <div className="medicamentos-container">
      <div className="page-container">
        <div className="content-section">
          <h2>Listado de Medicamentos</h2>
          <p>Consulta y gestión de los medicamentos en inventario.</p>

          {loading && <p>Cargando...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="medicamentos-list">
            {!loading &&
              Array.isArray(result) &&
              result.map((medicamento) => (
                <MedicamentoCard
                  nombre={medicamento.nombre}
                  descripcion={medicamento.descripcion}
                  cantidad={medicamento.cantidad}
                  fecha_vencimiento={medicamento.fecha_vencimiento}
                  img_url={medicamento.imagen_url}
                  key={medicamento.id}
                />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Medicamentos;
