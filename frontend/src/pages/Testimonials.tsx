import { Box, Typography, Container, Avatar, Rating } from "@mui/material";
import GlobalHeader from "../components/GlobalHeader";
import Footer from "../components/Footer";

const testimonials = [
  {
    name: "John Doe",
    role: "UoN Student",
    text: "NexGen completely changed how I track my HELB loans and daily expenses. The AI advice is spot on!",
    rating: 5,
  },
  {
    name: "Jane Mwangi",
    role: "Kenyatta University",
    text: "I saved over KSh 5,000 in my first month just by following the AI budget discipline tips.",
    rating: 5,
  },
  {
    name: "Alex Kiprop",
    role: "Strathmore University",
    text: "The predictive analytics showed me I would run out of money in 10 days. Helped me adjust early!",
    rating: 4,
  },
  {
    name: "Mary Wambui",
    role: "Moi University",
    text: "Creative, intuitive, and exactly what every Kenyan student needs.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ bgcolor: "var(--color-bg-main)", minHeight: "100vh" }}>
      <GlobalHeader />

      <Box
        sx={{
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 15 },
          background:
            "linear-gradient(135deg, var(--color-teal-dark), var(--color-primary-dark))",
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, letterSpacing: 2 }}
          >
            SUCCESS STORIES
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>
            What Our Users Say
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Trusted by thousands of university students across Kenya.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {testimonials.map((t) => (
            <Box
              key={t.name}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 16px)",
                  md: "calc(33.33% - 22px)",
                },
                bgcolor: "white",
                p: 5,
                borderRadius: "24px",
                border: "1px solid var(--color-border)",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                },
              }}
            >
              <Rating
                value={t.rating}
                readOnly
                sx={{ mb: 2, color: "var(--color-warning)" }}
              />
              <Typography
                sx={{
                  color: "var(--color-text-primary)",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                "{t.text}"
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: "var(--color-primary-light)",
                    color: "var(--color-primary-dark)",
                    fontWeight: 800,
                  }}
                >
                  {t.name[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    {t.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "var(--color-text-secondary)",
                      fontWeight: 600,
                    }}
                  >
                    {t.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default Testimonials;
