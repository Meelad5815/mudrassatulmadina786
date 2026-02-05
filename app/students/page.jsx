"use client";

import { useEffect, useState } from "react";
import { getStudents, getStudentsPaged, getTeachers, deleteStudent, exportStudentsCSV } from "@/lib/mock-service";
import Link from "next/link";
import { useToast } from "@/lib/toast-context";

export default function StudentsListPage() {
  const toast = useToast();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStudy, setFilterStudy] = useState("");
  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;
  const [classOptions, setClassOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    getTeachers().then(setTeachers).catch(console.error);
    getStudents()
      .then((all) => {
        const classes = Array.from(new Set(all.map((s) => s.currentClass))).filter(Boolean);
        const years = Array.from(new Set(all.map((s) => new Date(s.admissionDate).getFullYear()))).sort((a, b) => b - a);
        setClassOptions(classes);
        setYearOptions(years);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    loadPage();
  }, [page, query, filterStudy, filterStatus, filterTeacher, filterClass, filterYear]);

  async function loadPage() {
    const res = await getStudentsPaged({
      page,
      perPage,
      query,
      studyType: filterStudy,
      status: filterStatus,
      teacherId: filterTeacher,
      currentClass: filterClass,
      admissionYear: filterYear,
    });
    setStudents(res.students);
    setTotal(res.total);
  }

  const tmap = Object.fromEntries(teachers.map((t) => [t.id, t.name]));
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const handleDelete = async (id) => {
    if (!confirm("\u06A9\u06CC\u0627 \u0622\u067E \u0627\u0633 \u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u06A9\u0648 \u062D\u0630\u0641 \u06A9\u0631\u0646\u0627 \u0686\u0627\u06C1\u062A\u06D2 \u06C1\u06CC\u06BA\u061F")) return;
    try {
      await deleteStudent(id);
      loadPage();
      toast.add("\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u062D\u0630\u0641 \u06C1\u0648 \u06AF\u06CC\u0627", "success");
    } catch (err) {
      toast.add("\u062E\u0637\u0627: " + err.message, "error");
    }
  };

  const downloadCSV = () => {
    const csv = exportStudentsCSV();
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.add("CSV \u0688\u0627\u0624\u0646\u0644\u0648\u0688 \u0634\u0631\u0648\u0639 \u06C1\u0648 \u06AF\u06CC\u0627", "info");
  };

  return (
    <div>
      <h2>{"\u0637\u0644\u0628\u06C1"}</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/students/add">
          <button>{"\u0646\u06CC\u0627 \u0637\u0627\u0644\u0628\u0639\u0644\u0645"}</button>
        </Link>
        <input
          placeholder="\u0646\u0627\u0645 \u06CC\u0627 \u0648\u0627\u0644\u062F \u06A9\u0627 \u0646\u0627\u0645 \u062A\u0644\u0627\u0634 \u06A9\u0631\u06CC\u06BA"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          style={{ width: 220 }}
        />
        <select value={filterStudy} onChange={(e) => { setFilterStudy(e.target.value); setPage(1); }}>
          <option value="">{"\u062A\u0645\u0627\u0645 \u0645\u0637\u0627\u0644\u0639\u06C1"}</option>
          <option value="hifz">{"\u062D\u0641\u0638"}</option>
          <option value="nazra">{"\u0646\u0627\u0638\u0631\u06C1"}</option>
        </select>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}>
          <option value="">{"\u062A\u0645\u0627\u0645 \u062D\u0627\u0644\u062A\u06CC\u06BA"}</option>
          <option value="active">{"\u0641\u0639\u0627\u0644"}</option>
          <option value="completed">{"\u0645\u06A9\u0645\u0644"}</option>
          <option value="left">{"\u0686\u06BE\u0648\u0691 \u062F\u06CC\u0627"}</option>
        </select>
        <select value={filterClass} onChange={(e) => { setFilterClass(e.target.value); setPage(1); }}>
          <option value="">{"\u062A\u0645\u0627\u0645 \u06A9\u0644\u0627\u0633\u0632"}</option>
          {classOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}>
          <option value="">{"\u062A\u0645\u0627\u0645 \u0633\u0627\u0644"}</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={filterTeacher} onChange={(e) => { setFilterTeacher(e.target.value); setPage(1); }}>
          <option value="">{"\u062A\u0645\u0627\u0645 \u0642\u0627\u0631\u06CC"}</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <button onClick={downloadCSV}>{"CSV \u0628\u0631\u0622\u0645\u062F \u06A9\u0631\u06CC\u06BA"}</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>{"\u0646\u0627\u0645"}</th>
            <th>{"\u0648\u0627\u0644\u062F"}</th>
            <th>{"\u0645\u0637\u0627\u0644\u0639\u06C1"}</th>
            <th>{"\u062D\u0627\u0644\u062A"}</th>
            <th>{"\u06A9\u0644\u0627\u0633"}</th>
            <th>{"\u0642\u0627\u0631\u06CC"}</th>
            <th>{"\u0639\u0645\u0644"}</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.fatherName}</td>
              <td>{s.studyType === "hifz" ? "\u062D\u0641\u0638" : "\u0646\u0627\u0638\u0631\u06C1"}</td>
              <td>{s.currentStatus}</td>
              <td>{s.currentClass}</td>
              <td>{tmap[s.teacherId] || "-"}</td>
              <td className="actions">
                <Link href={`/students/${s.id}`}><button>{"\u062F\u06CC\u06A9\u06BE\u06CC\u06BA"}</button></Link>
                <Link href={`/students/add?edit=${s.id}`}><button>{"\u062A\u0631\u0645\u06CC\u0645"}</button></Link>
                <button onClick={() => handleDelete(s.id)}>{"\u062D\u0630\u0641"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <div>{"\u0635\u0641\u062D\u06C1"} {page} / {totalPages}</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>{"\u067E\u0686\u06BE\u0644\u0627"}</button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>{"\u0627\u06AF\u0644\u0627"}</button>
        </div>
      </div>
    </div>
  );
}
