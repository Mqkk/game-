"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouter, useSearchParams } from "next/navigation";
import { useStores } from "@/app/providers";
import styles from "./page.module.scss";

const LoginInner = observer(function LoginInner() {
  const { auth } = useStores();
  const router = useRouter();
  const search = useSearchParams();

  const next = useMemo(() => {
    const n = search.get("next");
    return n && n.startsWith("/") ? n : "/";
  }, [search]);

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.isAuthed) router.replace(next);
  }, [auth.isAuthed, next, router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await auth.login(password);
    if (res.ok) router.replace(next);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.title}>Вход</div>
        <div className={styles.sub}>Нужен только пароль</div>

        <form className={styles.form} onSubmit={(e) => void onSubmit(e)}>
          <label className={styles.label}>
            Пароль
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль…"
              autoFocus
            />
          </label>

          {auth.error && <div className={styles.error}>⚠️ {auth.error}</div>}

          <button className={styles.btn} disabled={auth.loading || !password}>
            {auth.loading ? "Входим…" : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
});

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
