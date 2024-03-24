import React, { memo } from "react";
import "./style.scss";

export interface ItemProps {
  name: string;
  id?: string;
  image: string;
  bgColor: string;
  tags: string[];
}

const Item: React.FC<ItemProps> = ({ name, image, bgColor }) => {
  return (
    <div className="card">
      <div style={{ backgroundColor: bgColor }}>
        <img src={image} alt={name} className="image" />
      </div>
      <div className="title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default memo(Item);
