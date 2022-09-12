import { Button, CircularProgress } from "@mui/material";

const ButtonWithLoader = ({ isLoading, onClick, style, children }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={isLoading}
      style={style}
    >
      {children}
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Button>
  );
};

export default ButtonWithLoader;
