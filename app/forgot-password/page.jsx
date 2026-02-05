"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/lib/mock-service";
import { useToast } from "@/lib/toast-context";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestPasswordReset(email);
      setToken(res.token);
      toast.add("Reset token generated (for demo)", "info");
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  return (
    <div>
      <h2>{"\u067E\u0627\u0633 \u0648\u0631\u0688 \u0631\u06CC \u0633\u06CC\u0679"}</h2>
      <div className="card" style={{ maxWidth: 440 }}>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>{"\u0627\u06CC \u0645\u06CC\u0644"}</label>
            <input placeholder="\u0627\u06CC \u0645\u06CC\u0644" value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{"\u0631\u06CC \u0633\u06CC\u0679 \u0679\u0648\u06A9\u0646 \u0628\u0646\u0627\u0626\u06CC\u06BA"}</button>
          </div>
        </form>
        {token && (
          <div style={{ marginTop: 12 }}>
            Demo token: <code>{token}</code>
          </div>
        )}
      </div>
    </div>
  );
}
