import * as React from "react";

function homeLogo(props) {
  return (
    <svg
      x={20}
      width={props.width}
      height={props.height}
      viewBox="50 70 170 40"
      {...props}
    >
      <g stroke="#fff" strokeWidth={1} fill="#ffffff00">
        <path
          stroke={props.stroke}
          d="M55.732 168.072l43.735-88 43.735 88h-87.47z"
        />
        <path
          stroke={props.stroke}
          fillOpacity="null"
          strokeOpacity="null"
          d="M182 81h32v87h-32zM115.536 107.822V32.245l62.52 75.577h-62.52z"
        />
      </g>
    </svg>
  );
}

export default homeLogo;
