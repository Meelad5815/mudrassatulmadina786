import React, { useEffect, useState } from "react";
import MetricCard from "../components/MetricCard";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";
import StudentTable from "../components/StudentTable";
import { getDashboardStats, getStudents } from "../services/mockService";

export default function Dashboard(){
  const [stats, setStats] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(()=> {
    getDashboardStats().then(setStats).catch(console.error);
    getStudents().then(s => setRecentStudents(s.slice(0,5))).catch(console.error);
  }, []);

  if(!stats) return <div>Loading...</div>;

  const activities = recentStudents.map(s => ({ id: s.id, text: `نیا طالبعلم داخل ہوا: ${s.name}`, date: s.admissionDate }));

  return (
    <div>
      <h1>Dashboard (ڈیش بورڈ)</h1>
      <div className="header-stats">
        <MetricCard title="کل طلبہ" value={stats.totalStudents} />
        <MetricCard title="فعال طلبہ" value={stats.activeStudents} />
        <MetricCard title="مکمل حافظ" value={stats.completedHuffaz} />
        <MetricCard title="فعال معلم" value={stats.activeTeachers} />
      </div>

      <section style={{marginTop:20}}>
        <QuickActions />
      </section>

      <section style={{marginTop:20, display:"flex", gap:16}}>
        <div style={{flex:1}}>
          <h3>حالیہ طلبہ</h3>
          <StudentTable limit={5} />
        </div>
        <div style={{width:320}}>
          <h3>حالیہ سرگرمیاں</h3>
          <RecentActivities activities={activities} />
        </div>
      </section>
    </div>
  );
}