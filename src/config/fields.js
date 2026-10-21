// Backend ke employee fields yahan define hain.
// Agar tumhare backend me alag field names hain (jaise "phone", "position"),
// to sirf is array ko edit karo — form aur table apne aap update ho jayenge.
export const EMPLOYEE_FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "department", label: "Department", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text", required: false },
  { name: "salary", label: "Salary", type: "number", required: false },
];

export const emptyEmployee = () =>
  Object.fromEntries(EMPLOYEE_FIELDS.map((f) => [f.name, ""]));
