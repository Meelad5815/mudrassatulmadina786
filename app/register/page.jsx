"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast-context";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await auth.register({ name, email, password, role });
      toast.add("\u0627\u06A9\u0627\u0624\u0646\u0679 \u0628\u0646 \u06AF\u06CC\u0627 \u0627\u0648\u0631 \u0622\u067E \u0644\u0627\u06AF \u0627\u0646 \u06C1\u0648\u06AF\u0626\u06D2 \u06C1\u06CC\u06BA", "success");
      router.push("/dashboard");
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  return (
    <div>
      <h2>{"\u0646\u06CC\u0627 \u0627\u06A9\u0627\u0624\u0646\u0679 \u0628\u0646\u0627\u0626\u06CC\u06BA"}</h2>
      <div className="card" style={{ maxWidth: 440 }}>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>{"\u0646\u0627\u0645"}</label>
            <input placeholder="\u0646\u0627\u0645" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>{"\u0627\u06CC \u0645\u06CC\u0644"}</label>
            <input placeholder="\u0627\u06CC \u0645\u06CC\u0644" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
          </div>
          <div className="form-row">
            <label>{"\u067E\u0627\u0633 \u0648\u0631\u0688"}</label>
            <input placeholder="\u067E\u0627\u0633 \u0648\u0631\u0688" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>
          <div className="form-row">
            <label>{"\u06A9\u0631\u062F\u0627\u0631"}</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{"\u0631\u062C\u0633\u0679\u0631 \u06A9\u0631\u06CC\u06BA"}</button>
            <Link href="/login">
              <button type="button" className="secondary">{"\u0644\u0627\u06AF \u0627\u0646 \u067E\u0631 \u062C\u0627\u0626\u06CC\u06BA"}</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
