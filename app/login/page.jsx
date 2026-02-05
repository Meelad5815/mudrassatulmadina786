"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast-context";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const router = useRouter();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(email, password);
      toast.add("\u062E\u0648\u0634 \u0622\u0645\u062F\u06CC\u062F", "success");
      router.push("/dashboard");
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  return (
    <div>
      <h2>{"\u0644\u0627\u06AF \u0627\u0646 \u06A9\u0631\u06CC\u06BA"}</h2>
      <div className="card" style={{ maxWidth: 440 }}>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>{"\u0627\u06CC \u0645\u06CC\u0644"}</label>
            <input placeholder="\u0627\u06CC \u0645\u06CC\u0644" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
          </div>
          <div className="form-row">
            <label>{"\u067E\u0627\u0633 \u0648\u0631\u0688"}</label>
            <input placeholder="\u067E\u0627\u0633 \u0648\u0631\u0688" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="submit">{"\u0644\u0627\u06AF \u0627\u0646"}</button>
            <Link href="/register">
              <button type="button" className="secondary">{"\u0631\u062C\u0633\u0679\u0631 \u06A9\u0631\u06CC\u06BA"}</button>
            </Link>
            <Link href="/forgot-password">
              <button type="button" className="secondary">{"\u067E\u0627\u0633 \u0648\u0631\u0688 \u0628\u06BE\u0648\u0644 \u06AF\u0626\u06D2\u061F"}</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
