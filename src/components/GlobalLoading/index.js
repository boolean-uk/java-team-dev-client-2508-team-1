import React from 'react';
import { useLoading } from '../../context/loading';
import './GlobalLoading.css';

const GlobalLoading = () => {
  const { isGlobalLoading, loadingMessage } = useLoading();

  if (!isGlobalLoading) return null;

  return (
    <div className="global-loading-overlay">
      <div className="global-loading-container">
        <div className="global-loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="global-loading-message">{loadingMessage}</p>
      </div>
    </div>
  );

/*     return (
      <div className="bg-green loadingscreen">
        <div className="">
          <FullLogo whiteLines="true" maxWidth="577px" />
          <div className="loadingscreen-loader">
            <span></span>
          </div>
        </div>
      </div>
    ); */
};

export default GlobalLoading;