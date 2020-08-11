import React from "react";
import { BsHeartFill as Heart, BsHeart as EmptyHeart } from "react-icons/bs";

interface Props {
  lives: number;
}

const LivesContainer: React.FC<Props> = (props) => {
  let lives = props.lives;

  return (
    <div>
      {lives >= 1 ? <Heart size={50} /> : <EmptyHeart size={50} />}
      {lives >= 2 ? <Heart size={50} /> : <EmptyHeart size={50} />}
      {lives === 3 ? <Heart size={50} /> : <EmptyHeart size={50} />}
    </div>
  );
};

export default LivesContainer;
