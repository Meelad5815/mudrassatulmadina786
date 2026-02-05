"use client";

export default function RecentActivities({ activities = [] }) {
  if (activities.length === 0)
    return (
      <div className="card">
        <p>{"\u06A9\u0648\u0626\u06CC \u062D\u0627\u0644\u06CC\u06C1 \u0633\u0631\u06AF\u0631\u0645\u06CC \u0646\u06C1\u06CC\u06BA"}</p>
      </div>
    );
  return (
    <div className="card">
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {activities.map((a) => (
          <li key={a.id} style={{ padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ fontWeight: 600 }}>{a.text}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
