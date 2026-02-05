"use client";

export default function MetricCard({ title, value, small }) {
  return (
    <div className="stat-card card">
      <h4>{title}</h4>
      <p>
        {value}
        {small && <span style={{ fontSize: 12, color: "var(--muted)" }}> {small}</span>}
      </p>
    </div>
  );
}
