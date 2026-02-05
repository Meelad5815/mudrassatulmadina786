"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/mock-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast-context";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      toast.add("\u067E\u0627\u0633 \u0648\u0631\u0688 \u0627\u067E\u0688\u06CC\u0679 \u06C1\u0648 \u06AF\u06CC\u0627", "success");
      router.push("/login");
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  return (
    <div>
      <h2>{"\u067E\u0627\u0633 \u0648\u0631\u0688 \u0631\u06CC \u0633\u06CC\u0679 \u06A9\u0631\u06CC\u06BA"}</h2>
      <div className="card" style={{ maxWidth: 440 }}>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>Reset token</label>
            <input placeholder="Reset token" value={token} onChange={(e) => setToken(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>{"\u0646\u06CC\u0627 \u067E\u0627\u0633 \u0648\u0631\u0688"}</label>
            <input placeholder="\u0646\u06CC\u0627 \u067E\u0627\u0633 \u0648\u0631\u0688" value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{"\u0627\u067E\u0688\u06CC\u0679 \u06A9\u0631\u06CC\u06BA"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
