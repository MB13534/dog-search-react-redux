import React from "react";

import "./Card.css";

const Card = ({ id, imgUrl, breed, group, temperament }) => {
  // const { id, url: imgUrl } = dog;
  // const { name: breed, breed_group: group, temperament } = dog.breeds[0];

  return (
    //there is a variable with the same name as each group that is added dynamically
    <div className="card" style={{ backgroundColor: `var(--${group})` }}>
      <div className="avatar">
        <div className="content">
          <img src={imgUrl} alt={`Dog ${id}`} />
          <div className="breed">{breed}</div>
          <div className="group">{group}</div>
          <div className="temperament">{temperament}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
