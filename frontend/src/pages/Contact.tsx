import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import GlobalHeader from "../components/GlobalHeader";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: "var(--color-bg-main)", minHeight: "100vh" }}>
      <GlobalHeader />

      <Box
        sx={{
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 15 },
          background:
            "linear-gradient(135deg, var(--color-primary-dark), var(--color-teal-dark))",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, letterSpacing: 2 }}
          >
            GET IN TOUCH
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            We're Here to Help
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Have questions about  FinGPS? Reach out to our team.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 8,
          }}
        >
         
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 4,
                color: "var(--color-text-primary)",
              }}
            >
              Contact Information
            </Typography>
            <Stack spacing={4}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Email sx={{ color: "var(--color-teal)" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Email Us
                  </Typography>
                  <Typography sx={{ color: "var(--color-text-secondary)" }}>
                    support@nexgen.co.ke
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Phone sx={{ color: "var(--color-teal)" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Call Us
                  </Typography>
                  <Typography sx={{ color: "var(--color-text-secondary)" }}>
                    +254 700 000 000
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <LocationOn sx={{ color: "var(--color-teal)" }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Visit Us
                  </Typography>
                  <Typography sx={{ color: "var(--color-text-secondary)" }}>
                    Nairobi, Kenya
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box sx={{ flex: 1.5 }}>
            <Paper
              sx={{
                p: 5,
                borderRadius: "24px",
                border: "1px solid var(--color-border)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                    }}
                  >
                    <TextField
                      label="Full Name"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <TextField
                      label="Email Address"
                      fullWidth
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Box>
                  <TextField
                    label="Subject"
                    fullWidth
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                  <TextField
                    label="Message"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    sx={{
                      py: 2,
                      bgcolor: "var(--color-primary)",
                      borderRadius: "12px",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "var(--color-primary-dark)" },
                    }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Contact;
