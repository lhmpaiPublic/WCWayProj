
const PrdWrap = ({ img, title, description }) => {
  return (
    <div className="prd-wrap">
      <img src={img} className="img" />
      <h2 className="title">{title}</h2>
      <div className="description">{description}</div>
    </div>
  );
};

export default PrdWrap;
