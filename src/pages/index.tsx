import React from 'react';
import ModalBasic from './ModalBasic';
import TreeBasic from './TreeBasic';
import TableBasic from './TableBasic';
import UploadBasic from './UploadBasic';
import PanelBasic from './PanelBasic';
import styles from './index.less';

export default function () {
  return (
    <div className={styles.normal}>
      <ModalBasic />
      <TreeBasic />
      <UploadBasic />
      <TableBasic/>
      <PanelBasic/>
    </div>
  );
}
