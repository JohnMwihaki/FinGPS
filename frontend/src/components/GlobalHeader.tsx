import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosConfig";

const fetchProfile = async () => (await api.get("users/profile/")).data;
const fetchNotifications = async () => (await api.get("notifications/")).data;

const GlobalHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated, logout } = useAuthStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: isAuthenticated,
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: isAuthenticated,
    refetchInterval: 30000, // Poll every 30s
  });

  const unreadCount = notifications?.filter((n: any) => !n.is_read).length || 0;

  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavItems = [
    { label: "About Us", path: "#about" },
    { label: "Testimonials", path: "#testimonials" },
    { label: "Our Team", path: "#team" },
    { label: "Contact Us", path: "/contact" },
  ];

  const handleNav = (path: string) => {
    if (path.startsWith("#")) {
      if (isLanding) {
        const element = document.getElementById(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/" + path);
      }
    } else {
      navigate(path);
    }
  };

  
  if (!isAuthenticated || isLanding) {
    return (
      <Box
        sx={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
          bgcolor: "white",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        {/* Left: Logo & Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "var(--color-text-primary)",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            FinGPS
          </Typography>
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                bgcolor: "#F3F4F6",
                borderRadius: "20px",
                p: 0.5,
                gap: 0.5,
              }}
            >
              <Button
                size="small"
                sx={{
                  borderRadius: "15px",
                  bgcolor: "var(--color-income-light)",
                  color: "var(--color-income)",
                  textTransform: "none",
                  fontWeight: 700,
                  px: 2,
                }}
              >
                Personal
              </Button>
              <Button
                size="small"
                sx={{
                  borderRadius: "15px",
                  color: "var(--color-text-secondary)",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                Business
              </Button>
            </Box>
          )}
        </Box>

     
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 3 }}>
            {NavItems.map((item) => (
              <Typography
                key={item.label}
                onClick={() => handleNav(item.path)}
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { color: "var(--color-primary)" },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Right*/}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: "var(--color-income)",
              fontWeight: 700,
              textTransform: "none",
              bgcolor: "var(--color-income-light)",
              borderRadius: "20px",
              px: 3,
              "&:hover": { bgcolor: "var(--color-income-light)", opacity: 0.8 },
            }}
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{
              bgcolor: "var(--color-teal-dark)",
              color: "white",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              "&:hover": { bgcolor: "var(--color-teal-dark)", opacity: 0.9 },
            }}
          >
            Get Started
          </Button>
          {isMobile && (
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 4,
        bgcolor: "white",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            display: { xs: "block", md: "none" },
            color: "var(--color-text-primary)",
          }}
        >
          FinGPS.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{ mr: 2 }}
          onClick={(e) => setNotifAnchorEl(e.currentTarget)}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon sx={{ color: "var(--color-text-secondary)" }} />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={() => setNotifAnchorEl(null)}
          sx={{ mt: 1 }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          PaperProps={{
            sx: { width: 320, maxHeight: 400, borderRadius: "16px" },
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 700 }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                variant="text"
                onClick={async () => {
                  await api.post("notifications/mark_all_read/");
                  setNotifAnchorEl(null);
                }}
              >
                Mark all as read
              </Button>
            )}
          </Box>
          {notifications?.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <NotificationsIcon
                sx={{ fontSize: "3rem", opacity: 0.1, mb: 1 }}
              />
              <Typography
                sx={{ color: "var(--color-text-secondary)", fontSize: "0.9rem" }}
              >
                No notifications yet
              </Typography>
            </Box>
          ) : (
            notifications?.map((notif: any) => (
              <MenuItem
                key={notif.id}
                sx={{
                  py: 1.5,
                  borderBottom: "1px solid #f0f0f0",
                  bgcolor: notif.is_read
                    ? "transparent"
                    : "rgba(30, 58, 138, 0.03)",
                  whiteSpace: "normal",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: notif.is_read
                      ? "transparent"
                      : "var(--color-primary)",
                    visibility: notif.is_read ? "hidden" : "visible",
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: notif.is_read ? 500 : 700,
                    }}
                  >
                    {notif.message}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.7rem",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {new Date(notif.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
        </Menu>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Avatar sx={{ bgcolor: "var(--color-primary)", fontWeight: 700 }}>
            {profile?.first_name
              ? profile.first_name[0].toUpperCase()
              : profile?.email
                ? profile.email[0].toUpperCase()
                : "U"}
          </Avatar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: "var(--color-text-primary)",
                fontSize: "0.9rem",
              }}
            >
              {profile?.first_name
                ? `${profile.first_name} ${profile.last_name || ""}`
                : profile?.email?.split("@")[0] || "User"}
            </Typography>
            <Typography
              sx={{ color: "var(--color-text-secondary)", fontSize: "0.75rem" }}
            >
              {profile?.university
                ? `${profile.university} | Year ${profile.year_of_study || "?"}`
                : "Student"}
            </Typography>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          sx={{ mt: 1 }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem onClick={() => navigate("/dashboard/settings")}>
            Profile
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{ color: "var(--color-expense)" }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default GlobalHeader;
