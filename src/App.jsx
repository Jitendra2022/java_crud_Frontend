import { useCallback, useEffect, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  errorMessage,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "./api/employeeApi";
import { EMPLOYEE_FIELDS } from "./config/fields";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [department, setDepartment] = useState("");     // input box
  const [activeFilter, setActiveFilter] = useState(""); // applied filter
  const [editing, setEditing] = useState(null);         // employee being edited
  const [viewing, setViewing] = useState(null);         // employee shown in details
  const [notice, setNotice] = useState(null);           // { type, text }

  const flash = (type, text) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  // READ (list)
  const loadEmployees = useCallback(async (dept = "") => {
    setLoading(true);
    try {
      const data = await getEmployees(dept);
      setEmployees(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      flash("error", errorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees(activeFilter);
  }, [activeFilter, loadEmployees]);

  // CREATE / UPDATE
  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (editing?.id) {
        await updateEmployee(editing.id, payload);
        flash("success", "Employee updated");
      } else {
        await createEmployee(payload);
        flash("success", "Employee created");
      }
      setEditing(null);
      await loadEmployees(activeFilter);
    } catch (err) {
      flash("error", errorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  // READ (single) -> edit form me bharne ke liye
  const handleEdit = async (id) => {
    try {
      const emp = await getEmployee(id);
      setEditing(emp);
      setViewing(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      flash("error", errorMessage(err));
    }
  };

  // READ (single) -> details dikhane ke liye
  const handleView = async (id) => {
    try {
      setViewing(await getEmployee(id));
    } catch (err) {
      flash("error", errorMessage(err));
    }
  };

  // DELETE
  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete ${emp.name || "this employee"}? This cannot be undone.`)) return;
    try {
      await deleteEmployee(emp.id);
      flash("success", "Employee deleted");
      if (editing?.id === emp.id) setEditing(null);
      if (viewing?.id === emp.id) setViewing(null);
      await loadEmployees(activeFilter);
    } catch (err) {
      flash("error", errorMessage(err));
    }
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setActiveFilter(department.trim());
  };

  const clearFilter = () => {
    setDepartment("");
    setActiveFilter("");
  };

  return (
    <div className="app">
      <header className="top">
        <h1>Employees</h1>
        <p>
          {employees.length} {employees.length === 1 ? "record" : "records"}
          {activeFilter && ` in ${activeFilter}`}
        </p>
      </header>

      {notice && <div className={`notice ${notice.type}`} role="status">{notice.text}</div>}

      <div className="layout">
        <aside>
          <EmployeeForm
            initial={editing}
            saving={saving}
            onSubmit={handleSubmit}
            onCancel={editing ? () => setEditing(null) : undefined}
          />

          {viewing && (
            <div className="panel details">
              <div className="details-head">
                <h2>Employee #{viewing.id}</h2>
                <button className="btn small" onClick={() => setViewing(null)}>Close</button>
              </div>
              <dl>
                {EMPLOYEE_FIELDS.map((f) => (
                  <div key={f.name}>
                    <dt>{f.label}</dt>
                    <dd>{viewing[f.name] ?? "—"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </aside>

        <main>
          <form className="filter" onSubmit={applyFilter}>
            <input
              placeholder="Filter by department (e.g. IT)"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <button className="btn primary" type="submit">Filter</button>
            {activeFilter && (
              <button className="btn" type="button" onClick={clearFilter}>Show all</button>
            )}
          </form>

          <EmployeeTable
            employees={employees}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}
