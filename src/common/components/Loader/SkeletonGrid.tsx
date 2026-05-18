import { Skeleton, Box } from "@mui/material";

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "16px",
        }}
    >
        {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width="100%" height={240} sx={{ borderRadius: 2 }} />
        ))}
    </Box>
);