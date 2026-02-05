"use client";

import { useEffect, useState } from "react";
import { getStudents, getTeachers } from "@/lib/mock-service";
import { useRouter } from "next/navigation";

export default function StudentTable({ limit }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getStudents()
      .then((s) => setStudents(limit ? s.slice(0, limit) : s))
      .catch(console.error);
    getTeachers().then(setTeachers).catch(console.error);
  }, [limit]);

  const tmap = Object.fromEntries(teachers.map((t) => [t.id, t.name]));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>{"\u0627\u0633\u0645"}</th>
          <th>{"\u0642\u0633\u0645"}</th>
          <th>{"\u06A9\u0644\u0627\u0633"}</th>
          <th>{"\u062D\u0627\u0644\u062A"}</th>
          <th>{"\u0642\u0627\u0631\u06CC"}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.studyType === "hifz" ? "\u062D\u0641\u0638" : "\u0646\u0627\u0638\u0631\u06C1"}</td>
            <td>{s.currentClass}</td>
            <td>{s.currentStatus}</td>
            <td>{tmap[s.teacherId] || "-"}</td>
            <td className="actions">
              <button onClick={() => router.push(`/students/${s.id}`)}>{"\u062F\u06CC\u06A9\u06BE\u06CC\u06BA"}</button>
              <button onClick={() => router.push(`/students/add?edit=${s.id}`)}>{"\u062A\u0631\u0645\u06CC\u0645"}</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
