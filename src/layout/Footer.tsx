// src/layout/Footer.tsx
import React from 'react'
import styles from './Footer.module.css'

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    © {new Date().getFullYear()} Ventixe
  </footer>
)
