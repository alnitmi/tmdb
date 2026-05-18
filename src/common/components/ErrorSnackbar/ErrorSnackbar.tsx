import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearError } from "@/app/errorSlice";

export const ErrorSnackbar = () => {
    const errorMessage = useAppSelector((state) => state.error.message);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(clearError());
    };

    return (
        <Snackbar
            open={!!errorMessage}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity="error" variant="filled">
                {errorMessage}
            </Alert>
        </Snackbar>
    );
};