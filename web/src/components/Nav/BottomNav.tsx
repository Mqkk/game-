"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.scss";

function IconHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 10.5 12 4l8 6.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H5.5A1.5 1.5 0 0 1 4 20v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHistory(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 7.5a7.5 7.5 0 1 1-1.2 9.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7 7v3.5H3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5v4.2l2.9 1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconNext(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3l1.1 3.1L16.3 7 13.1 8.1 12 11.3 10.9 8.1 7.7 7l3.2-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M18.2 12.4l.7 2 2 .6-2 .7-.7 2-.6-2-2-.7 2-.6.6-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isHistory = pathname === "/history";

  return (
    <nav className={`${styles.nav} safeBottom`} aria-label="Навигация">
      <Link className={`${styles.btn} ${isHome ? styles.active : ""}`} href="/">
        <IconHome className={styles.icon} />
        <span className={styles.label}>Главная</span>
      </Link>
      <Link
        className={`${styles.btn} ${isHistory ? styles.active : ""}`}
        href="/history"
      >
        <IconHistory className={styles.icon} />
        <span className={styles.label}>История</span>
      </Link>
      <button className={`${styles.btn} ${styles.disabled}`} disabled>
        <IconNext className={styles.icon} />
        <span className={styles.label}>NEXT?</span>
      </button>
    </nav>
  );
}
