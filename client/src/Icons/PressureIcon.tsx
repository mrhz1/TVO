import React from "react";
import { SvgPropsType } from "../Types";

const PressureIcon: React.FC<SvgPropsType> = ({
  size = 24,
  fill = "#ffffff",
  tooltip = "",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      data-tooltip-target={tooltip}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M20.6933 17.3294C21.0506 15.9959 21.0964 14.5982 20.8271 13.2442C20.5577 11.8902 19.9806 10.6164 19.1402 9.52115C18.2998 8.42593 17.2187 7.53872 15.9806 6.92815C14.7425 6.31757 13.3805 6 12 6C10.6195 6 9.25752 6.31757 8.0194 6.92815C6.78128 7.53872 5.70021 8.42593 4.85982 9.52115C4.01943 10.6164 3.44225 11.8902 3.17293 13.2442C2.90361 14.5982 2.94937 15.9959 3.30667 17.3294"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M12.7657 15.5823C13.2532 16.2916 12.9104 17.3738 12 17.9994C11.0897 18.625 9.95652 18.5571 9.46906 17.8477C8.94955 17.0917 7.15616 12.8409 6.06713 10.2114C5.86203 9.71621 6.4677 9.3 6.85648 9.669C8.92077 11.6283 12.2462 14.8263 12.7657 15.5823Z"
          stroke={fill}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M12 6V8"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M5.63599 8.63574L7.0502 10.05"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M18.364 8.63574L16.9498 10.05"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M20.6934 17.3291L18.7615 16.8115"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
        <path
          d="M3.30664 17.3291L5.23849 16.8115"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default PressureIcon;
