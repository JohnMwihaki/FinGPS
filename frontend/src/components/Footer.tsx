import {
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "var(--color-bg-card)",
        pt: 10,
        pb: 4,
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6, mb: 6 }}>
          <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 300px" } }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mb: 2, color: "var(--color-primary)" }}
            >
              FinGPS
            </Typography>
            <Typography
              sx={{
                color: "var(--color-text-secondary)",
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              The ultimate financial intelligence platform for students in
              Kenya. Track, save, and grow your wealth with AI-powered insights.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="primary" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="primary" size="small">
                <Instagram />
              </IconButton>
              <IconButton color="primary" size="small">
                <LinkedIn />
              </IconButton>
            </Stack>
          </Box>

        
          <Box sx={{ flex: "1 1 150px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>
              Platform
            </Typography>
            <Stack spacing={2}>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/login")}
              >
                Dashboard
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/")}
              >
                Features
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/about")}
              >
                Our Mission
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: "1 1 150px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>
              Company
            </Typography>
            <Stack spacing={2}>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/about")}
              >
                About Us
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/team")}
              >
                Meet Our Team
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/testimonials")}
              >
                Testimonials
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ flex: "1 1 150px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>
              Support
            </Typography>
            <Stack spacing={2}>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                sx={{
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  "&:hover": { color: "var(--color-primary)" },
                }}
              >
                Terms of Service
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "var(--color-text-light)" }}>
            © 2026 FinGPS. Built with ❤️ by the FinGPS Team.
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
                color: "var(--color-text-light)", 
                fontWeight: 700,
                cursor: 'pointer',
                '&:hover': { color: 'var(--color-primary)' }
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              UPArrow
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
