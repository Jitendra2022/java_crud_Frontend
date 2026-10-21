import { useEffect, useState } from "react";
import { EMPLOYEE_FIELDS, emptyEmployee } from "../config/fields";

export default function EmployeeForm({ initial, saving, onSubmit, onCancel }) {
  const isEdit = Boolean(initial?.id);
  const [values, setValues] = useState(emptyEmployee());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues({ ...emptyEmployee(), ...(initial || {}) });
    setErrors({});
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    EMPLOYEE_FIELDS.forEach((f) => {
      if (f.required && !String(values[f.name] ?? "").trim()) {
        er[f.name] = `${f.label} is required`;
      }
    });
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {};
    EMPLOYEE_FIELDS.forEach((f) => {
      const raw = values[f.name];
      payload[f.name] =
        f.type === "number" ? (raw === "" ? null : Number(raw)) : String(raw).trim();
    });
    onSubmit(payload);
  };

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? "Edit employee" : "Add employee"}</h2>

      {EMPLOYEE_FIELDS.map((f) => (
        <label key={f.name} className="field">
          <span>
            {f.label}
            {f.required && <em> *</em>}
          </span>
          <input
            name={f.name}
            type={f.type}
            value={values[f.name] ?? ""}
            onChange={handleChange}
            aria-invalid={Boolean(errors[f.name])}
          />
          {errors[f.name] && <small className="field-error">{errors[f.name]}</small>}
        </label>
      ))}

      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving…" : isEdit ? "Update employee" : "Create employee"}
        </button>
        {onCancel && (
          <button type="button" className="btn" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
