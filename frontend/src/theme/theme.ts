import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", 
      light: "#3B82F6",
      dark: "#1E40AF",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#0EA5A4", 
      light: "#5EEAD4",
      dark: "#0F766E",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#16A34A", 
      light: "#4ADE80",
      dark: "#166534",
    },

    warning: {
      main: "#F59E0B", 
      light: "#FCD34D",
      dark: "#B45309",
    },

    error: {
      main: "#DC2626", 
      light: "#F87171",
      dark: "#7F1D1D",
    },

    info: {
      main: "#0284C7", 
    },

    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
     
          "--color-primary": "#040918",
          "--color-primary-light": "#3B82F6",
          "--color-primary-dark": "#040d2e",

          "--color-teal": "#0EA5A4",
          "--color-teal-light": "#5EEAD4",
          "--color-teal-dark": "#0F766E",

          
          "--color-income": "#16A34A",
          "--color-income-dark": "#064E3B",
          "--color-income-light": "#4ADE80",

          "--color-expense": "#DC2626",      
          "--color-expense-light": "#F87171",

          "--color-savings": "#0284C7",      
          "--color-investment": "#0EA5A4",   

          "--color-warning": "#F59E0B",      
          "--color-alert": "#F97316",

        
          "--color-bg-main": "#F9FAFB",
          "--color-bg-card": "#FFFFFF",
          "--color-bg-muted": "#F3F4F6",

         
          "--color-text-primary": "#111827",
          "--color-text-secondary": "#6B7280",
          "--color-text-light": "#9CA3AF",

          
          "--color-border": "#E5E7EB",
          "--color-border-dark": "#D1D5DB",

          "--color-accent-orange": "#F97316",
          "--color-accent-yellow": "#FACC15",

         
          "--gradient-primary": "linear-gradient(135deg, #1E3A8A, #0EA5A4)",
          "--gradient-success": "linear-gradient(135deg, #16A34A, #4ADE80)",
          "--gradient-warning": "linear-gradient(135deg, #F59E0B, #F97316)",

          
          "--overlay-light": "rgba(255,255,255,0.6)",
          "--overlay-dark": "rgba(0,0,0,0.4)",

     
          "--chart-income": "#16A34A",
          "--chart-expense": "#DC2626",
          "--chart-savings": "#0284C7",
          "--chart-investment": "#0EA5A4",
          "--chart-warning": "#F59E0B",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },

        containedPrimary: {
          background: "var(--gradient-primary)",
        },

        containedSuccess: {
          background: "var(--gradient-success)",
        },

        containedWarning: {
          background: "var(--gradient-warning)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          border: "1px solid var(--color-border)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});

export default theme;