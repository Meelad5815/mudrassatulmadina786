"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>{user.name}</span>
            <button onClick={logout} className="secondary">
              {"\u0644\u0627\u06AF \u0622\u0624\u0679"}
            </button>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "U")}&background=0b4d6c&color=fff`}
              alt="avatar"
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="secondary">{"\u0644\u0627\u06AF \u0627\u0646"}</button>
            </Link>
            <Link href="/register">
              <button>{"\u0631\u062C\u0633\u0679\u0631"}</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
