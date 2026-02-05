"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "\u0688\u06CC\u0634 \u0628\u0648\u0631\u0688" },
    { href: "/students", label: "\u0637\u0644\u0628\u06C1 (Students)" },
    { href: "/teachers", label: "\u0642\u0627\u0631\u06CC (Teachers)" },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="sidebar">
      <h2>{"\u0645\u062F\u0631\u0633\u06C3 \u0627\u0644\u0645\u062F\u06CC\u0646\u06C1"}</h2>
      <nav>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
            {l.label}
          </Link>
        ))}

        <Link href="/attendance" className={isActive("/attendance") ? "active" : ""}>
          {"\u062D\u0627\u0636\u0631\u06CC (Attendance)"}
        </Link>
        <div className="sidebar-sub">
          <Link href="/attendance/reports" className={pathname === "/attendance/reports" ? "active" : ""}>
            {"\u0631\u067E\u0648\u0631\u0679\u0633"}
          </Link>
        </div>

        <Link href="/certificates" className={isActive("/certificates") ? "active" : ""}>
          {"\u0627\u0633\u0646\u0627\u062F (Certificates)"}
        </Link>
        <Link href="/activities" className={isActive("/activities") ? "active" : ""}>
          {"\u0633\u0631\u06AF\u0631\u0645\u06CC\u0627\u06BA (Activities)"}
        </Link>
        <Link href="/construction" className={isActive("/construction") ? "active" : ""}>
          {"\u062A\u0639\u0645\u06CC\u0631 (Construction)"}
        </Link>
        <Link href="/admin/users" className={isActive("/admin") ? "active" : ""}>
          {"\u06CC\u0648\u0632\u0631\u0632 & \u0631\u0648\u0644\u0632"}
        </Link>
        <Link href="/settings" className={isActive("/settings") ? "active" : ""}>
          {"\u0633\u06CC\u0679\u0646\u06AF\u0632"}
        </Link>
      </nav>
    </aside>
  );
}
