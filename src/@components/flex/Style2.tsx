import styles from './Style2.module.scss';
import React from 'react';

interface Props {
    children: React.ReactNode
}

const Style1 = ({children}:Props) => {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

export default Style1