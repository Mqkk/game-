"use client";

import { makeAutoObservable, runInAction } from "mobx";
import type { AuthStore } from "./authStore";
import { apiFetch } from "@/lib/api";

export type HistoryItem = {
  pointIndex: number;
  day: number;
  message: string | null;
  imageUrl: string | null;
  question: string | null;
  answer: string | null;
  hasAnsweredQuestion: boolean;
};

export class HistoryStore {
  private auth: AuthStore;

  items: HistoryItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(auth: AuthStore) {
    makeAutoObservable(this);
    this.auth = auth;
  }

  async load() {
    if (!this.auth.token) return;
    this.loading = true;
    this.error = null;
    try {
      // Историю мы берём из старого эндпоинта игры (прошлая версия)
      const data = await apiFetch<HistoryItem[]>("/api/game/history", {
        headers: { Authorization: `Bearer ${this.auth.token}` },
      });
      runInAction(() => {
        this.items = data || [];
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error = e instanceof Error ? e.message : "Ошибка загрузки истории";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
