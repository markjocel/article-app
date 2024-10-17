"use client";

import React from 'react';
import styles from './loading-overlay.module.scss'

const LoadingOverlay = () => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}/>
    </div>
  );
};

export default LoadingOverlay;