import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IpProvider } from './context/IpContext';
import { HistoryProvider } from './context/HistoryContext';
import { MobileSidebarProvider } from './context/MobileSidebarContext';
import { LoadingProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IpProvider>
      <HistoryProvider>
        <LoadingProvider>
        <MobileSidebarProvider>
          <App />
        </MobileSidebarProvider>
        </LoadingProvider>
      </HistoryProvider>
    </IpProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
