"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/app/providers";
import { FlipCard } from "@/components/Cards/FlipCard";
import styles from "./page.module.scss";

export default observer(function HomePage() {
  const { cards } = useStores();

  useEffect(() => {
    void cards.load();
  }, [cards]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Коллекция карточек</h1>
      <p className={styles.subtitle}>
        Для активации необходимо нажать на карточку
      </p>

      {cards.loading && <div className={styles.state}>Загрузка…</div>}
      {cards.error && <div className={styles.stateError}>⚠️ {cards.error}</div>}

      <div className={styles.grid}>
        {cards.items
          .filter((x) => x.enabled)
          .map((item) => (
            <FlipCard
              key={item.id}
              text={item.text}
              imageUrl={item.imageUrl || undefined}
            />
          ))}
      </div>
    </div>
  );
});
