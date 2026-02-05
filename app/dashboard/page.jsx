"use client";

import { useEffect, useState } from "react";
import MetricCard from "@/components/metric-card";
import QuickActions from "@/components/quick-actions";
import RecentActivities from "@/components/recent-activities";
import StudentTable from "@/components/student-table";
import { getDashboardStats, getStudents } from "@/lib/mock-service";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error);
    getStudents()
      .then((s) => setRecentStudents(s.slice(0, 5)))
      .catch(console.error);
  }, []);

  if (!stats) return <div>Loading...</div>;

  const activities = recentStudents.map((s) => ({
    id: s.id,
    text: `\u0646\u06CC\u0627 \u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u062F\u0627\u062E\u0644 \u06C1\u0648\u0627: ${s.name}`,
    date: s.admissionDate,
  }));

  return (
    <div>
      <h1>{"Dashboard (\u0688\u06CC\u0634 \u0628\u0648\u0631\u0688)"}</h1>
      <div className="header-stats">
        <MetricCard title={"\u06A9\u0644 \u0637\u0644\u0628\u06C1"} value={stats.totalStudents} />
        <MetricCard title={"\u0641\u0639\u0627\u0644 \u0637\u0644\u0628\u06C1"} value={stats.activeStudents} />
        <MetricCard title={"\u0645\u06A9\u0645\u0644 \u062D\u0627\u0641\u0638"} value={stats.completedHuffaz} />
        <MetricCard title={"\u0641\u0639\u0627\u0644 \u0645\u0639\u0644\u0645"} value={stats.activeTeachers} />
      </div>

      <section style={{ marginTop: 20 }}>
        <QuickActions />
      </section>

      <section style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>{"\u062D\u0627\u0644\u06CC\u06C1 \u0637\u0644\u0628\u06C1"}</h3>
          <StudentTable limit={5} />
        </div>
        <div style={{ width: 320 }}>
          <h3>{"\u062D\u0627\u0644\u06CC\u06C1 \u0633\u0631\u06AF\u0631\u0645\u06CC\u0627\u06BA"}</h3>
          <RecentActivities activities={activities} />
        </div>
      </section>
    </div>
  );
}
