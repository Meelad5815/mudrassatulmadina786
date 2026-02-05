"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => router.push("/students/add")}>{"\u0637\u0627\u0644\u0628\u0639\u0644\u0645 \u0634\u0627\u0645\u0644 \u06A9\u0631\u06CC\u06BA"}</button>
      <button onClick={() => router.push("/teachers/add")}>{"\u0642\u0627\u0631\u06CC \u0634\u0627\u0645\u0644 \u06A9\u0631\u06CC\u06BA"}</button>
      <button onClick={() => router.push("/attendance")}>{"\u062D\u0627\u0636\u0631\u06CC \u0644\u06AF\u0627\u0626\u06CC\u06BA"}</button>
      <button onClick={() => router.push("/attendance/reports")} className="secondary">
        {"\u0631\u067E\u0648\u0631\u0679\u0633"}
      </button>
    </div>
  );
}
