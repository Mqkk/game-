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
};

export class CardsStore {
  private auth: AuthStore;

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
      const data = await apiFetch<WebCard[]>("/api/web/cards", {
        headers: { Authorization: `Bearer ${this.auth.token}` },
      });
      runInAction(() => {
        this.items = (data || []).slice().sort((a, b) => a.order - b.order);
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
}
