import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://backend.jitendra.sbs",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// POST /api/employees
export const createEmployee = async (data) => {
  const res = await api.post("/api/employees", data);
  return res.data;
};

// GET /api/employees  (optional ?department=IT)
export const getEmployees = async (department) => {
  const res = await api.get("/api/employees", {
    params: department ? { department } : {},
  });
  return res.data;
};

// GET /api/employees/{id}
export const getEmployee = async (id) => {
  const res = await api.get(`/api/employees/${id}`);
  return res.data;
};

// PUT /api/employees/{id}
export const updateEmployee = async (id, data) => {
  const res = await api.put(`/api/employees/${id}`, data);
  return res.data;
};

// DELETE /api/employees/{id}
export const deleteEmployee = async (id) => {
  const res = await api.delete(`/api/employees/${id}`);
  return res.data;
};

// Error se readable message nikalne ke liye
export const errorMessage = (err) => {
  if (err.response) {
    const d = err.response.data;
    const detail =
      typeof d === "string" ? d : d?.message || d?.error || JSON.stringify(d);
    return `Server error ${err.response.status}${detail ? ": " + detail : ""}`;
  }
  if (err.request) {
    return "Server se response nahi mila. Internet, backend URL ya CORS check karo.";
  }
  return err.message;
};
