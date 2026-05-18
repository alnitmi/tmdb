import { LinearProgress } from "@mui/material";
import { useAppSelector } from "@/app/hooks";

export const GlobalLinearProgress = () => {
    const isLoading = useAppSelector((state) => state.loading.count > 0);
    if (!isLoading) return null;

    return (
        <LinearProgress
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                height: 3,
            }}
        />
    );
};