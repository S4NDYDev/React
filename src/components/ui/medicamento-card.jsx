const MedicamentoCard = ({
  img_url,
  nombre,
  descripcion,
  cantidad,
  fecha_vencimiento,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <img src={`${img_url}`} alt="" className="card-image" />
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-title">{nombre}</h3>
        <p className="card-description">{descripcion}</p>
        <p className="card-vencimiento">{fecha_vencimiento}</p>
        <p className="card-cantidad">{cantidad}</p>
      </div>
    </div>
  );
};

export default MedicamentoCard;
