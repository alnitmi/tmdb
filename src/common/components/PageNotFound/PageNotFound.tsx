import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const PageNotFound = () => (
    <Container sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom>404</Typography>
        <Typography variant="h5" gutterBottom>Page Not Found</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
            Go to Main Page
        </Button>
    </Container>
);