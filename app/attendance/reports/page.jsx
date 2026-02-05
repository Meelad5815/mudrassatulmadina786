"use client";

import { useEffect, useState } from "react";
import { getAttendanceSummary, exportAttendanceCSV } from "@/lib/mock-service";
import { useToast } from "@/lib/toast-context";

function SimpleBarChart({ data }) {
  if (!data || data.length === 0) return <div className="card">{"\u06A9\u0648\u0626\u06CC \u0688\u06CC\u0679\u0627 \u0646\u06C1\u06CC\u06BA"}</div>;
  const max = Math.max(...data.map((d) => d.present + d.absent));
  return (
    <div className="card" style={{ padding: 12 }}>
      {data.map((d) => (
        <div key={d.date} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 80, fontSize: 12 }}>{d.date}</div>
          <div style={{ flex: 1, height: 18, background: "#e6eef4", borderRadius: 6, overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${(d.present / (max || 1)) * 100}%`, height: "100%", background: "var(--primary)" }}></div>
          </div>
          <div style={{ width: 110, textAlign: "right", fontSize: 12 }}>
            {d.present} {"\u062D\u0627\u0636\u0631"} / {d.absent} {"\u063A\u0627\u0626\u0628"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AttendanceReportsPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    load();
  }, [month, year]);

  function load() {
    const res = getAttendanceSummary(month, year);
    setData(res);
  }

  const downloadCSV = () => {
    const csv = exportAttendanceCSV(month, year);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${year}-${String(month).padStart(2, "0")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.add("CSV \u0688\u0627\u0624\u0646\u0644\u0648\u0688 \u0634\u0631\u0648\u0639 \u06C1\u0648 \u06AF\u06CC\u0627", "info");
  };

  return (
    <div>
      <h2>{"Attendance Reports"}</h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
        <label>{"\u0645\u0627\u06C1"}:</label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} style={{ width: "auto" }}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <label>{"\u0633\u0627\u0644"}:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))} style={{ width: "auto" }}>
          {Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button onClick={downloadCSV}>{"CSV \u0628\u0631\u0622\u0645\u062F \u06A9\u0631\u06CC\u06BA"}</button>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>{"\u0631\u0648\u0632\u0627\u0646\u06C1 \u062E\u0644\u0627\u0635\u06C1"}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>{"\u062A\u0627\u0631\u06CC\u062E"}</th>
                <th>{"\u062D\u0627\u0636\u0631"}</th>
                <th>{"\u063A\u0627\u0626\u0628"}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{d.present}</td>
                  <td>{d.absent}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={3}>{"\u06A9\u0648\u0626\u06CC \u0688\u06CC\u0679\u0627 \u0645\u0648\u062C\u0648\u062F \u0646\u06C1\u06CC\u06BA"}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ width: 360 }}>
          <h4>{"\u0686\u0627\u0631\u0679"}</h4>
          <SimpleBarChart data={data} />
        </div>
      </div>
    </div>
  );
}
