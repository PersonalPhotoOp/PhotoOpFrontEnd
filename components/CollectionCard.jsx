import React from "react";

const CollectionCard = ({ collection }) => {
  return (
    <div className="border shadow-md p-4">
      <h2 className="font-bold text-xl">{collection.name}</h2>
      <p>{collection.imageCount} photos</p>
    </div>
  );
};

export default CollectionCard;
