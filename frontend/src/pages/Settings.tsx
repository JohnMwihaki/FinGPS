import { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosConfig";

const fetchProfile = async () => (await api.get("users/profile/")).data;

const Settings = () => {
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setUniversity(profile.university || "");
      setCourse(profile.course || "");
      setYearOfStudy(profile.year_of_study || "");
    }
  }, [profile]);

  const profileMutation = useMutation({
    mutationFn: (data: any) => api.patch("users/profile/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (data: any) => api.patch("users/password/", data),
    onSuccess: () => {
      setOldPassword("");
      setNewPassword("");
      toast.success("Password updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update password. Check old password.");
    },
  });

  const handleProfileSubmit = (e: any) => {
    e.preventDefault();
    profileMutation.mutate({
      first_name: firstName,
      last_name: lastName,
      university,
      course,
      year_of_study: yearOfStudy ? parseInt(yearOfStudy) : null,
    });
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    passwordMutation.mutate({
      old_password: oldPassword,
      new_password: newPassword,
    });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="800" mb={4}>
        Account Settings
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 4,
        }}
      >
        <Paper sx={{ p: 4, borderRadius: "24px" }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Profile Information
          </Typography>
          <form
            onSubmit={handleProfileSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Box>
            <TextField
              label="University / Institution"
              placeholder="e.g. University of Nairobi"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              fullWidth
            />
            <TextField
              label="Course of Study"
              placeholder="e.g. Bachelor of Medicine"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              fullWidth
            />
            <TextField
              label="Year of Study"
              type="number"
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={profileMutation.isPending}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Save Profile
            </Button>
          </form>
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Security
          </Typography>
          <form
            onSubmit={handlePasswordSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={passwordMutation.isPending}
            >
              Update Password
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
export default Settings;
