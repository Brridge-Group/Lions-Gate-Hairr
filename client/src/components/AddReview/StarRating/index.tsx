import React, { useState } from "react";
import { Star } from "./StarRatingElements";

interface Props {
  id: string;
}

export const StarRating = (props: Props) => {
  const [rating, setRating] = useState<number | null>(null);

  const stars = [...Array(5)].map((element, i) => {
    const starRating = i + 1;

    return (
      <Star key={"star" + starRating} htmlFor={"star" + starRating}>
        {rating && starRating <= rating ? <>&#9733;</> : <>&#9734;</>}
        <input
          id={"star" + starRating}
          type="radio"
          name="rating"
          value={starRating}
          onClick={() => setRating(starRating)}
        />
      </Star>
    );
  });
  return <div id={props.id}>{stars}</div>;
};
