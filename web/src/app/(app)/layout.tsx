import { AuthGate } from "@/components/Auth/AuthGate";
import { BottomNav } from "@/components/Nav/BottomNav";
import { InstallPrompt } from "@/components/Pwa/InstallPrompt";
import styles from "./layout.module.scss";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>
            ForYou <span>💕</span>
          </div>
          <div className={styles.sub}></div>
        </header>

        <main className={styles.main}>{children}</main>

        <InstallPrompt />
        <BottomNav />
      </div>
    </AuthGate>
  );
}
