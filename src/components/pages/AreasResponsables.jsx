import "../../styles/Medicamentos.css";
import { useGetMedicamentos } from "../../hooks/useGetMedicamentos";
import MedicamentoCard from "../ui/medicamento-card";

const Medicamentos = () => {
  const { result, loading, error } = useGetMedicamentos();
  console.log(result);

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
                  key={medicamento.id}
                  nombre={medicamento.nombre}
                  descripcion={medicamento.descripcion}
                  fecha_vencimiento={medicamento.fecha_vencimiento}
                  cantidad={medicamento.cantidad}
                  img_url={medicamento.img_url}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;
