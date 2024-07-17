import { Snackbar } from "@mui/material";
import useStore from "../../store";

function SnackbarManager() {
  const { toastMsg, setToastr } = useStore();
  return (
    <Snackbar
      message={toastMsg}
      open={!!toastMsg}
      autoHideDuration={5000}
      onClose={() => setToastr("")}
      //   anchorOrigin={{
      //     horizontal: "center",
      //     vertical: "top",
      //   }}
    />
  );
}

export default SnackbarManager;
