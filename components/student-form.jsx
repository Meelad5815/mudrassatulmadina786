"use client";

import { useState, useEffect } from "react";
import { getTeachers } from "@/lib/mock-service";

export default function StudentForm({ initial = {}, onSubmit, submitLabel = "\u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA" }) {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    dateOfBirth: "",
    admissionDate: "",
    studyType: "hifz",
    teacherId: "",
    currentClass: "",
    progressParas: 0,
    currentStatus: "active",
    ...initial,
  });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachers().then(setTeachers).catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>{"\u0646\u0627\u0645"}</label>
        <input placeholder="\u0646\u0627\u0645" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      </div>
      <div className="form-row">
        <label>{"\u0648\u0627\u0644\u062F \u06A9\u0627 \u0646\u0627\u0645"}</label>
        <input placeholder="\u0648\u0627\u0644\u062F \u06A9\u0627 \u0646\u0627\u0645" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} />
      </div>
      <div className="form-row">
        <label>{"\u062A\u0627\u0631\u06CC\u062E\u0650 \u067E\u06CC\u062F\u0627\u0626\u0634"}</label>
        <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
      </div>
      <div className="form-row">
        <label>{"\u062A\u0627\u0631\u06CC\u062E\u0650 \u062F\u0627\u062E\u0644\u06C1"}</label>
        <input type="date" value={form.admissionDate} onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} />
      </div>
      <div className="form-row">
        <label>{"\u0645\u0637\u0627\u0644\u0639\u06C1 \u06A9\u06CC \u0642\u0633\u0645"}</label>
        <select value={form.studyType} onChange={(e) => setForm({ ...form, studyType: e.target.value })}>
          <option value="hifz">{"\u062D\u0641\u0638"}</option>
          <option value="nazra">{"\u0646\u0627\u0638\u0631\u06C1"}</option>
        </select>
      </div>
      <div className="form-row">
        <label>{"\u0642\u0627\u0631\u06CC \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA"}</label>
        <select value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })}>
          <option value="">{"-- \u0645\u0646\u062A\u062E\u0628 \u06A9\u0631\u06CC\u06BA --"}</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} ({t.role})
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
