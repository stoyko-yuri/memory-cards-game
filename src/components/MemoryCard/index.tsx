import React from "react";
import "./MemoryCard.css";

type Props = {
  colorItem: {
    _id: number;
    color: string;
    isClicked: boolean;
  };
  onClick: (colorIndex: number) => void;
};

const MemoryCard = ({ colorItem, onClick }: Props) => {
  return (
    <div
      className="MemoryCard"
      style={{ background: colorItem.isClicked ? colorItem.color : "#242424" }}
      onClick={() => onClick(colorItem._id)}
    >
      {colorItem.isClicked && colorItem.color}
    </div>
  );
};

export default MemoryCard;
