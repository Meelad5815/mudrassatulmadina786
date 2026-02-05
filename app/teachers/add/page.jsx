"use client";

import { useState } from "react";
import { addTeacher } from "@/lib/mock-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/toast-context";

export default function AddTeacherPage() {
  const [form, setForm] = useState({ name: "", qualification: "", role: "hifz", status: "active", joiningDate: "" });
  const router = useRouter();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    await addTeacher(form);
    toast.add("\u0642\u0627\u0631\u06CC \u06A9\u0627\u0645\u06CC\u0627\u0628\u06CC \u0633\u06D2 \u0634\u0627\u0645\u0644 \u06C1\u0648\u0627", "success");
    router.push("/teachers");
  };

  return (
    <div>
      <h2>{"\u0642\u0627\u0631\u06CC \u0634\u0627\u0645\u0644 \u06A9\u0631\u06CC\u06BA"}</h2>
      <div className="card" style={{ maxWidth: 500 }}>
        <form onSubmit={submit}>
          <div className="form-row">
            <label>{"\u0646\u0627\u0645"}</label>
            <input placeholder="\u0646\u0627\u0645" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-row">
            <label>{"\u0642\u0627\u0628\u0644\u06CC\u062A"}</label>
            <input placeholder="\u0642\u0627\u0628\u0644\u06CC\u062A" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
          </div>
          <div className="form-row">
            <label>{"\u0631\u0648\u0644"}</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="hifz">{"\u062D\u0641\u0638"}</option>
              <option value="nazra">{"\u0646\u0627\u0638\u0631\u06C1"}</option>
              <option value="both">{"\u062F\u0648\u0646\u0648\u06BA"}</option>
            </select>
          </div>
          <button type="submit">{"\u0645\u062D\u0641\u0648\u0638 \u06A9\u0631\u06CC\u06BA"}</button>
        </form>
      </div>
    </div>
  );
}
