import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosConfig";
import {
  Add,
  ReceiptLong,
  TrendingUp,
  TrendingDown,
  DeleteOutline,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { MASTER_CATEGORIES } from "./Budgets";

const fetchTransactions = async () => (await api.get("transactions/")).data;

const Transactions = () => {
  const queryClient = useQueryClient();
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  const [type, setType] = useState("EXPENSE");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: (newTransaction: any) =>
      api.post("transactions/", newTransaction),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["ai-advice"] });

      if (data.data.alert_message) {
        toast.error(data.data.alert_message, { position: "top-center" });
      } else {
        toast.success("Transaction saved successfully!");
      }

      setCategory("");
      setCustomCategory("");
      setAmount("");
      setDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`transactions/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["kpis"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["ai-advice"] });
      toast.info("Transaction deleted successfully.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = category === "Others" ? customCategory : category;
    if (!finalCategory) return toast.error("Please specify a category.");
    mutation.mutate({
      type,
      category: finalCategory,
      amount: parseFloat(amount),
      description,
    });
  };

  const formatKSh = (val: any) => `KSh ${Number(val).toLocaleString()}`;

  return (
    <Box sx={{ color: "var(--color-text-primary)" }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Transactions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 4,
        }}
      >
    
        <Paper
          sx={{
            flex: 1,
            p: 4,
            borderRadius: "24px",
            bgcolor: "white",
            height: "fit-content",
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          }}
        >
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Add sx={{ color: "var(--color-primary)" }} /> Add New
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="INCOME">Income</MenuItem>
                <MenuItem value="EXPENSE">Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {MASTER_CATEGORIES.filter((c) =>
                  type === "INCOME"
                    ? c === "Income / Allowance" || c === "Others"
                    : c !== "Income / Allowance",
                ).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {category === "Others" && (
              <TextField
                fullWidth
                label="Specify Other Category"
                placeholder="e.g. Fine, Medical"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                required
              />
            )}
            <TextField
              fullWidth
              label="Amount (KSh)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={mutation.isPending}
              sx={{
                py: 1.5,
                borderRadius: "12px",
                bgcolor: "var(--color-primary)",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              {mutation.isPending ? "Saving..." : "Save Transaction"}
            </Button>
          </Stack>
        </Paper>

       
        <Paper
          sx={{
            flex: 2,
            p: 4,
            borderRadius: "24px",
            bgcolor: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ReceiptLong sx={{ color: "var(--color-teal)" }} /> Recent History
          </Typography>

          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "var(--color-text-secondary)",
                      textAlign: "right",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell sx={{ width: 50 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
                  ?.slice()
                  .reverse()
                  .map((t: any) => (
                    <TableRow
                      key={t.id}
                      hover
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          color: "var(--color-text-secondary)",
                          fontSize: "0.85rem",
                        }}
                      >
                        {t.date}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                          >
                            {t.category}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: "var(--color-text-light)",
                            }}
                          >
                            {t.description || "-"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={formatKSh(t.amount)}
                          size="small"
                          icon={
                            t.type === "INCOME" ? (
                              <TrendingUp />
                            ) : (
                              <TrendingDown />
                            )
                          }
                          sx={{
                            fontWeight: 800,
                            bgcolor:
                              t.type === "INCOME"
                                ? "var(--color-income-light)"
                                : "var(--color-expense-light)",
                            color:
                              t.type === "INCOME"
                                ? "var(--color-income)"
                                : "var(--color-expense)",
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => deleteMutation.mutate(t.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Transactions;
