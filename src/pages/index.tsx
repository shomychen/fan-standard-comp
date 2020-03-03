import React from 'react';
import styles from './index.css';
import ModalBasic from './ModalBasic';
import TreeBasic from './TreeBasic';

export default function () {
  return (
    <div className={styles.normal}>
      <ModalBasic />
      <TreeBasic />
    </div>
  );
}
