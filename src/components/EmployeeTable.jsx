import { EMPLOYEE_FIELDS } from "../config/fields";

export default function EmployeeTable({ employees, loading, onView, onEdit, onDelete }) {
  if (loading) return <div className="panel empty">Loading employees…</div>;

  if (!employees.length) {
    return (
      <div className="panel empty">
        No employees found. Add one using the form.
      </div>
    );
  }

  return (
    <div className="panel table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {EMPLOYEE_FIELDS.map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              {EMPLOYEE_FIELDS.map((f) => (
                <td key={f.name}>{emp[f.name] ?? "—"}</td>
              ))}
              <td className="right row-actions">
                <button className="btn small" onClick={() => onView(emp.id)}>View</button>
                <button className="btn small" onClick={() => onEdit(emp.id)}>Edit</button>
                <button className="btn small danger" onClick={() => onDelete(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
