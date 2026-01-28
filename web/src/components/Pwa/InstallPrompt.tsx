"use client";

import { useEffect, useMemo, useState } from "react";
import { isIos, isStandalone } from "@/lib/pwa";
import styles from "./InstallPrompt.module.scss";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [hidden, setHidden] = useState(false);

  const shouldShow = useMemo(() => {
    if (hidden) return false;
    if (typeof window === "undefined") return false;
    if (isStandalone()) return false;
    return Boolean(deferred) || isIos();
  }, [deferred, hidden]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!shouldShow) return null;

  const onInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setHidden(true);
  };

  return (
    <div
      className={styles.wrap}
      role="region"
      aria-label="Установка приложения"
    >
      <div className={styles.card}>
        <div className={styles.title}>Установить как приложение</div>
        {isIos() ? (
          <div className={styles.text}>
            На iPhone: нажмите <b>Поделиться</b> → <b>На экран «Домой»</b>.
          </div>
        ) : (
          <div className={styles.text}>
            Установите PWA, чтобы запускать быстрее и “как приложение”.
          </div>
        )}

        <div className={styles.actions}>
          {!isIos() && (
            <button className={styles.primary} onClick={() => void onInstall()}>
              Установить
            </button>
          )}
          <button className={styles.secondary} onClick={() => setHidden(true)}>
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
