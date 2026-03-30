import { useState } from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import GlobalHeader from "./GlobalHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7fe" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ width: 250, flexShrink: 0 }}>
          <Sidebar />
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        <Sidebar onNavClick={() => setMobileOpen(false)} />
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: { md: `calc(100% - 250px)` },
        }}
      >
        <GlobalHeader onMenuClick={handleDrawerToggle} />
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
export default Layout;
