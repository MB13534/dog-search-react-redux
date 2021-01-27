import React from "react";

import Card from "./Card";

const CardList = ({ data: dogList }) => {
  return (
    <div className="dogs-container">
      {/* map over each dog in the dogList and render out a card */}
      {dogList.map((dog) => {
        return (
          <Card
            id={dog.id}
            imgUrl={dog.url}
            breed={dog.breeds[0].name}
            group={dog.breeds[0].breed_group}
            temperament={dog.breeds[0].temperament}
            key={dog.id}
          />
        );
      })}
    </div>
  );
};

export default CardList;
