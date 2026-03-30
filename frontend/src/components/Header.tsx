import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosConfig";

const fetchProfile = async () => (await api.get("users/profile/")).data;
const fetchNotifications = async () => (await api.get("notifications/")).data;

const Header = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const unreadCount = notifications
    ? notifications.filter((n: any) => !n.is_read).length
    : 0;

  const initials = profile?.first_name
    ? `${profile.first_name[0] || ""}${profile.last_name ? profile.last_name[0] : ""}`.toUpperCase()
    : "US";

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    handleClose();
    navigate("/dashboard/settings");
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: 4,
        bgcolor: "#fafafa",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <IconButton size="large" color="inherit" sx={{ mr: 2, color: "#64748b" }}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Box
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleMenu}
      >
        <Avatar sx={{ bgcolor: "#1e3a8a", fontWeight: "bold" }}>
          {initials}
        </Avatar>
        <Box sx={{ ml: 1.5, display: { xs: "none", md: "block" } }}>
          <Typography variant="body2" fontWeight="bold" color="#1e293b">
            {profile?.first_name
              ? `${profile.first_name} ${profile.last_name}`
              : "User"}
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleSettings}>Profile Settings</MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default Header;
