import React from 'react';
import { Sidebar } from './Sidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
        </header>

        <section className={styles.content}>
          {children}
        </section>

        <footer className={styles.footer}>
          © 2025 Ventixe
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
