"use client";

import { useEffect, useState } from "react";
import { getTeachers } from "@/lib/mock-service";
import Link from "next/link";

export default function TeacherListPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachers().then(setTeachers).catch(console.error);
  }, []);

  return (
    <div>
      <h2>{"\u0642\u0627\u0631\u06CC (Teachers)"}</h2>
      <div style={{ marginBottom: 12 }}>
        <Link href="/teachers/add">
          <button>{"\u0646\u06CC\u0627 \u0642\u0627\u0631\u06CC"}</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>{"\u0646\u0627\u0645"}</th>
            <th>{"\u0642\u0627\u0628\u0644\u06CC\u062A"}</th>
            <th>{"\u0631\u0648\u0644"}</th>
            <th>{"\u062D\u0627\u0644\u062A"}</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.qualification}</td>
              <td>{t.role}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
