// src/layout/Header.tsx
import React from 'react'
import styles from './Header.module.css'

type Props = { title: string }

export const Header: React.FC<Props> = ({ title }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
  </header>
)
