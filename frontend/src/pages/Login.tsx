import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosConfig";
import GlobalHeader from "../components/GlobalHeader";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("users/login/", {
        email: identifier,
        password,
      });
      login(response.data.access);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Check your credentials.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <GlobalHeader />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: { xs: "column", md: "row" },
          bgcolor: "var(--color-bg-main)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: "var(--color-primary-dark)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 8,
          }}
        >
          <Typography variant="h3" fontWeight="900" mb={3}>
            Welcome Back
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "var(--color-text-light)",
              opacity: 0.8,
              maxWidth: 400,
            }}
          >
            Sign in to your account to continue managing your finances and
            achieving your goals.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={1}
              sx={{ color: "var(--color-text-primary)" }}
            >
              Log In
            </Typography>
            <Typography
              variant="body1"
              mb={4}
              sx={{ color: "var(--color-text-secondary)" }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "var(--color-income)",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <TextField
                label="Username or Email"
                variant="outlined"
                fullWidth
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box sx={{ textAlign: "right" }}>
                <MuiLink
                  href="#"
                  underline="hover"
                  sx={{
                    color: "var(--color-text-primary)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Password reset link sent to your email!");
                  }}
                >
                  Forgot password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  bgcolor: "var(--color-income)",
                  "&:hover": { bgcolor: "var(--color-income)", opacity: 0.9 },
                }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
