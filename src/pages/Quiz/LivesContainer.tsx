import React from "react";
import {Heart as EmptyHeart, HeartFill as Heart} from 'react-bootstrap-icons'


interface Props {
  lives: number;
}

export const LivesContainer: React.FC<Props> = (props) => {
  let lives = props.lives;

  return (
    <div style={{marginTop: 16 }}>
      {lives >= 1 ? <Heart size={30} /> : <EmptyHeart size={30} />}
      &nbsp;&nbsp;
      {lives >= 2 ? <Heart size={30} /> : <EmptyHeart size={30} />}
      &nbsp;&nbsp;
      {lives === 3 ? <Heart size={30} /> : <EmptyHeart size={30} />}
    </div>
  );
};
