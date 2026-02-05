"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStudentById } from "@/lib/mock-service";

export default function StudentProfilePage() {
  const params = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (params.id) {
      getStudentById(params.id).then(setStudent).catch(console.error);
    }
  }, [params.id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h2>{"\u067E\u0631\u0648\u0641\u0627\u0626\u0644"}: {student.name}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="stat-card">
          <strong>{"\u0648\u0627\u0644\u062F"}:</strong> {student.fatherName}
        </div>
        <div className="stat-card">
          <strong>{"\u067E\u06CC\u062F\u0627\u0626\u0634"}:</strong> {student.dateOfBirth}
        </div>
        <div className="stat-card">
          <strong>{"\u062F\u0627\u062E\u0644\u06C1"}:</strong> {student.admissionDate}
        </div>
        <div className="stat-card">
          <strong>{"\u0645\u0637\u0627\u0644\u0639\u06C1"}:</strong> {student.studyType}
        </div>
        <div className="stat-card">
          <strong>{"\u067E\u0631\u0648\u06AF\u0631\u06CC\u0633 (\u067E\u0627\u0631\u06D2)"}:</strong> {student.progressParas}
        </div>
        <div className="stat-card">
          <strong>{"\u06A9\u0644\u0627\u0633"}:</strong> {student.currentClass}
        </div>
      </div>
    </div>
  );
}
