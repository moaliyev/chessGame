import "../assets/css/Cell.css";

const Cell: React.FC<PropType> = ({ image, count }: PropType) => {
  return (
    <div className={`cell ${count % 2 ? "green" : "white"}`}>
      {image ? <img src={image} alt={image.split(".")[0]} /> : ""}
    </div>
  );
};

type PropType = {
  image?: string;
  count: number;
};

export default Cell;
