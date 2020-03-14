import React from 'react';
import styles from './index.css';
import ModalBasic from './ModalBasic';
import TreeBasic from './TreeBasic';
import TableBasic from './TableBasic';

export default function () {
  return (
    <div className={styles.normal}>
      <ModalBasic />
      <TreeBasic />
      <TableBasic/>
    </div>
  );
}
