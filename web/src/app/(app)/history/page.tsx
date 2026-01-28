"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/app/providers";
import styles from "./page.module.scss";

export default observer(function HistoryPage() {
  const { history } = useStores();

  useEffect(() => {
    void history.load();
  }, [history]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>История</h1>
      <p className={styles.subtitle}>Посещённые клетки из мобильной версии</p>

      {history.loading && <div className={styles.state}>Загрузка…</div>}
      {history.error && (
        <div className={styles.stateError}>⚠️ {history.error}</div>
      )}

      <div className={styles.list}>
        {history.items.map((item) => (
          <div className={styles.item} key={`${item.pointIndex}-${item.day}`}>
            <div className={styles.badges}>
              <div className={styles.badge}>
                {item.day === 0 ? "Старт" : `День ${item.day}`}
              </div>
              <div className={styles.badgeMuted}>Точка {item.pointIndex}</div>
            </div>

            {item.message && (
              <div className={styles.message}>{item.message}</div>
            )}

            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.image} src={item.imageUrl} alt="" />
            )}

            {item.question && (
              <div className={styles.qa}>
                <div className={styles.q}>❓ {item.question}</div>
                {item.hasAnsweredQuestion && item.answer ? (
                  <div className={styles.a}>✅ {item.answer}</div>
                ) : (
                  <div className={styles.aMuted}>⏳ ещё не отвечено</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
