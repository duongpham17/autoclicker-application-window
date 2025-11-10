import styles from './Style1.module.scss';
import React from 'react';

interface Props {
    children: React.ReactNode,
    padding?: string,
}

const Center = ({children, padding}: Props) => {
  return (
    <div className={styles.container} style={{padding}}>{children}</div>
  )
}

export default Center