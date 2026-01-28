"use client";

import { useMemo } from "react";
import styles from "./FlipCard.module.scss";

type Face = "q" | "text" | "image";

export function FlipCard({
  step,
  text,
  imageUrl,
  onStepChange,
}: {
  step: 0 | 1 | 2;
  text: string;
  imageUrl?: string;
  onStepChange: (next: 0 | 1 | 2) => void;
}) {
  const face: Face = useMemo(() => {
    if (step === 0) return "q";
    if (step === 1) return "text";
    return "image";
  }, [step]);

  const rotation = step * 180; // 0, 180, 360

  const onClick = () => {
    const next = (step === 2 ? 0 : ((step + 1) as 1 | 2)) as 0 | 1 | 2;
    onStepChange(next);
  };

  return (
    <button className={styles.card} onClick={onClick} type="button">
      <div
        className={styles.inner}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <div className={`${styles.face} ${styles.front}`}>
          {face === "q" && <div className={styles.q}>?</div>}
          {face === "image" && (
            <div className={styles.imageWrap}>
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.image} src={imageUrl} alt="" />
              ) : (
                <div className={styles.noImage}>Нет картинки</div>
              )}
            </div>
          )}
        </div>

        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.text}>{text || "…"}</div>
        </div>
      </div>
    </button>
  );
}
