import React from "react";
import {HeartOutlined as EmptyHeart, HeartFilled as Heart} from "@ant-design/icons"

interface Props {
  lives: number;
}

const LivesContainer: React.FC<Props> = (props) => {
  let lives = props.lives;

  return (
    <div style={{marginTop: 16 }}>
      {lives >= 1 ? <Heart size={50} /> : <EmptyHeart size={50} />}
      {lives >= 2 ? <Heart size={50} /> : <EmptyHeart size={50} />}
      {lives === 3 ? <Heart size={50} /> : <EmptyHeart size={50} />}
    </div>
  );
};

export default LivesContainer;
