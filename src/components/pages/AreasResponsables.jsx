import React, { useState, useEffect } from 'react';
import '../../styles/Medicamentos.css';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Asumimos que el endpoint es /api/medicamentos
        const response = await fetch('/api/medicamentos');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de medicamentos.');
        }
        const data = await response.json();
        setMedicamentos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, []);

  return (
    <div className="medicamentos-container">
      <div className="page-container">
        <div className="content-section">
          <h2>Listado de Medicamentos</h2>
          <p>Consulta y gestión de los medicamentos en inventario.</p>
          
          {loading && <p>Cargando...</p>}
          {error && <p className="error-message">{error}</p>}
          
          <div className="medicamentos-list">
            {medicamentos.map(medicamento => (
              <div className="medicamento-card" key={medicamento.id}>
                <img className="medicamento-imagen" src={medicamento.imagen_url} alt={medicamento.nombre} />
                <h3>{medicamento.nombre}</h3>
                <p><strong>Descripción:</strong> {medicamento.descripcion}</p>
                <p><strong>Vencimiento:</strong> {new Date(medicamento.fecha_vencimiento).toLocaleDateString()}</p>
                <p><strong>Cantidad:</strong> {medicamento.cantidad}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;
