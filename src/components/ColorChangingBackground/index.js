import { css, cx, keyframes } from "@emotion/css";

const bgcolor = keyframes`
0% {
    background-color: #45a3e5
}

30% {
    background-color: #66bf39
}

60% {
    background-color: #eb670f
}

90% {
    background-color: #f35
}

100% {
    background-color: #45a3e5
}
`;

const classes = {
  pageContainer: css`
    width: 100%;
    min-height: 100%;
    -webkit-animation: ${bgcolor} 30s infinite;
    animation: ${bgcolor} 30s infinite;
  `,
};

const ColorChangingBackground = ({ children }) => {
  return <div className={classes.pageContainer}>{children}</div>;
};

export default ColorChangingBackground;
