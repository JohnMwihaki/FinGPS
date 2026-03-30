import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: "pointer",
            fontWeight: 800,
            background: "linear-gradient(90deg, #4FC3F7, #FF8A65)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          onClick={() => navigate("/")}
        >
          Financial GPS
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/transactions")}>
            Transactions
          </Button>
          <Button color="inherit" onClick={() => navigate("/budgets")}>
            Budgets
          </Button>
          <Button color="inherit" onClick={() => navigate("/savings")}>
            Savings
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleLogout}
            sx={{ ml: 2, borderRadius: "20px" }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
