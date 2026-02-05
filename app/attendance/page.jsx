"use client";

import { useEffect, useState } from "react";
import { getStudents, markAttendance } from "@/lib/mock-service";
import { useToast } from "@/lib/toast-context";
import Link from "next/link";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [marks, setMarks] = useState({});
  const toast = useToast();

  useEffect(() => {
    getStudents().then(setStudents).catch(console.error);
  }, []);

  const toggle = (id, status) => setMarks((prev) => ({ ...prev, [id]: status }));

  const markAll = (status) => {
    const map = {};
    students.forEach((s) => (map[s.id] = status));
    setMarks(map);
  };

  const submit = async () => {
    const arr = students.map((s) => ({ studentId: s.id, status: marks[s.id] || "absent" }));
    await markAttendance(date, arr);
    toast.add("\u062D\u0627\u0636\u0631\u06CC \u0645\u062D\u0641\u0648\u0638 \u06C1\u0648\u06AF\u0626\u06CC", "success");
  };

  return (
    <div>
      <h2>{"\u0631\u0648\u0632\u0627\u0646\u06C1 \u062D\u0627\u0636\u0631\u06CC"}</h2>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <label>{"\u062A\u0627\u0631\u06CC\u062E"}: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "auto" }} />
        <button onClick={() => markAll("present")}>{"\u062A\u0645\u0627\u0645 \u062D\u0627\u0636\u0631 \u06A9\u0631\u06CC\u06BA"}</button>
        <button onClick={() => markAll("absent")}>{"\u062A\u0645\u0627\u0645 \u063A\u0627\u0626\u0628 \u06A9\u0631\u06CC\u06BA"}</button>
        <Link href="/attendance/reports">
          <button className="secondary">{"\u0631\u067E\u0648\u0631\u0679\u0633 \u062F\u06CC\u06A9\u06BE\u06CC\u06BA"}</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{"\u0646\u0627\u0645"}</th>
            <th>{"\u06A9\u0644\u0627\u0633"}</th>
            <th>{"\u062D\u0627\u0636\u0631\u06CC"}</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.currentClass}</td>
              <td>
                <button
                  onClick={() => toggle(s.id, "present")}
                  style={{ marginLeft: 6, background: marks[s.id] === "present" ? "var(--primary)" : "", color: marks[s.id] === "present" ? "var(--text-light)" : "" }}
                >
                  {"\u062D\u0627\u0636\u0631"}
                </button>
                <button
                  onClick={() => toggle(s.id, "absent")}
                  style={{ background: marks[s.id] === "absent" ? "var(--primary)" : "", color: marks[s.id] === "absent" ? "var(--text-light)" : "" }}
                >
                  {"\u063A\u0627\u0626\u0628"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <button onClick={submit}>{"\u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA"}</button>
      </div>
    </div>
  );
}
