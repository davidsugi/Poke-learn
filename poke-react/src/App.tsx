import React from 'react';
import './App.css';
import Background from './components/Background';
import LandingPage from './pages/LandingPage';
import AssetLoader from './components/AssetLoader';


export default function App() {
  return (
    <main>
      <AssetLoader>
        <Background>
          <LandingPage />
        </Background>
      </AssetLoader>
    </main>
  )
}

