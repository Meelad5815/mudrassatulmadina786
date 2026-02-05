"use client";

import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser } from "@/lib/mock-service";
import { useToast } from "@/lib/toast-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const toast = useToast();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // Wait for auth to load
    }
    load();
  }, []);

  async function load() {
    const u = await getUsers();
    setUsers(u);
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      await addUser(form);
      toast.add("User added", "success");
      setForm({ name: "", email: "", password: "", role: "admin" });
      load();
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  const toggleRole = async (u) => {
    try {
      await updateUser(u.id, { role: u.role === "admin" ? "teacher" : "admin" });
      toast.add("Role updated", "success");
      load();
    } catch (err) {
      toast.add(err.message, "error");
    }
  };

  return (
    <div>
      <h2>{"Users & Roles"}</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <table className="table">
            <thead>
              <tr>
                <th>{"\u0646\u0627\u0645"}</th>
                <th>{"\u0627\u06CC \u0645\u06CC\u0644"}</th>
                <th>{"\u06A9\u0631\u062F\u0627\u0631"}</th>
                <th>{"\u0639\u0645\u0644"}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => toggleRole(u)}>{"Role \u062A\u0628\u062F\u06CC\u0644"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ width: 360 }}>
          <h4>{"\u0646\u06CC\u0627 \u06CC\u0648\u0632\u0631 \u0628\u0646\u0627\u0626\u06CC\u06BA"}</h4>
          <form onSubmit={submit}>
            <div className="form-row">
              <input placeholder="\u0646\u0627\u0645" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-row">
              <input placeholder="\u0627\u06CC \u0645\u06CC\u0644" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-row">
              <input placeholder="\u067E\u0627\u0633 \u0648\u0631\u0688" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required type="password" />
            </div>
            <div className="form-row">
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <button type="submit">{"\u0628\u0646\u0627\u0626\u06CC\u06BA"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
