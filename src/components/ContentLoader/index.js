import { LinearProgress, Box } from "@mui/material";

const ContentLoader = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
          <LinearProgress />
        </Box>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ContentLoader;
