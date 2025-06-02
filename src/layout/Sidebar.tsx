// src/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

// Se till att filerna verkligen heter Logo.svg och Ticket.svg i src/images
import Logo from '../images/Logo.svg.svg';
import Ticket from '../images/Ticket.svg.svg';

export const Sidebar: React.FC = () => (
  <aside className={styles.sidebar}>
    <div className={styles.logo}>
      <img src={Logo} alt="Ventixe" />
    </div>
    <nav className={styles.nav}>
      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive
            ? `${styles.link} ${styles.linkActive}`
            : styles.link
        }
      >
        <img src={Ticket} alt="" className={styles.icon} />
        <span>Events</span>
      </NavLink>
    </nav>
  </aside>
);
