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
      <h1 className={styles.title}>{cards.pageTitle}</h1>
      <p className={styles.subtitle}>{cards.pageDescription}</p>

      {cards.loading && <div className={styles.state}>Загрузка…</div>}
      {cards.error && <div className={styles.stateError}>⚠️ {cards.error}</div>}

      <div className={styles.grid}>
        {cards.items
          .filter((x) => x.enabled)
          .map((item) => (
            <FlipCard
              key={item.id}
              step={item.state ?? 0}
              text={item.text}
              imageUrl={item.imageUrl || undefined}
              onStepChange={(next) => void cards.setState(item.id, next)}
            />
          ))}
      </div>
    </div>
  );
});
