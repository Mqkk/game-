"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { apiFetch } from "@/lib/api";
import type { AuthStore } from "./authStore";

export type WebCard = {
  id: number;
  order: number;
  text: string;
  imageUrl: string | null;
  enabled: boolean;
  state: 0 | 1 | 2;
};

export class CardsStore {
  private auth: AuthStore;

  pageTitle = "Коллекция карточек";
  pageDescription = "Для активации необходимо нажать на карточку";
  items: WebCard[] = [];
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
      const data = await apiFetch<{
        title: string;
        description: string;
        cards: WebCard[];
      }>("/api/web/home", {
        headers: { Authorization: `Bearer ${this.auth.token}` },
      });
      runInAction(() => {
        this.pageTitle = data?.title || this.pageTitle;
        this.pageDescription = data?.description || this.pageDescription;
        this.items = (data?.cards || [])
          .slice()
          .sort((a, b) => a.order - b.order);
      });
    } catch (e: unknown) {
      runInAction(() => {
        this.error =
          e instanceof Error ? e.message : "Ошибка загрузки карточек";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async setState(cardId: number, state: 0 | 1 | 2) {
    if (!this.auth.token) return;
    // optimistic
    const prev = this.items.find((x) => x.id === cardId)?.state;
    runInAction(() => {
      this.items = this.items.map((x) =>
        x.id === cardId ? { ...x, state } : x
      );
    });

    try {
      await apiFetch<{ success: true }>(`/api/web/cards/${cardId}/state`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${this.auth.token}` },
        body: JSON.stringify({ state }),
      });
    } catch (e: unknown) {
      // rollback
      runInAction(() => {
        this.items = this.items.map((x) =>
          x.id === cardId ? { ...x, state: (prev ?? 0) as 0 | 1 | 2 } : x
        );
        this.error = e instanceof Error ? e.message : "Ошибка сохранения";
      });
    }
  }
}
