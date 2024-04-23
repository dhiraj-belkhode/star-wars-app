import { CircularProgress, CircularProgressProps } from "@mui/material";

const Loader = (props: CircularProgressProps) => {
  return <CircularProgress color="secondary" {...props} />;
};

export default Loader;
