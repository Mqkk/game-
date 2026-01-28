"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { apiFetch } from "@/lib/api";

type LoginResult = { ok: true } | { ok: false; message: string };

export class AuthStore {
  token: string | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthed() {
    return Boolean(this.token);
  }

  hydrate() {
    if (typeof window === "undefined") return;
    const token = window.localStorage.getItem("web_token");
    runInAction(() => {
      this.token = token || null;
    });
  }

  logout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("web_token");
    }
    this.token = null;
  }

  async login(password: string): Promise<LoginResult> {
    this.loading = true;
    this.error = null;
    try {
      const res = await apiFetch<{ token: string }>("/api/web/auth/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (!res.token) {
        return { ok: false, message: "Не удалось войти" };
      }

      runInAction(() => {
        this.token = res.token;
      });

      if (typeof window !== "undefined") {
        window.localStorage.setItem("web_token", res.token);
      }

      return { ok: true };
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === "string"
          ? e
          : "Ошибка авторизации";
      runInAction(() => {
        this.error = message;
      });
      return { ok: false, message };
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
