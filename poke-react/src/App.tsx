import React from 'react';
import './App.css';
import Background from './components/Background';
import LandingPage from './pages/LandingPage';
import AssetLoader from './components/AssetLoader';
import useStore from './services/store';
import Result from './pages/Result';
import { ConfigProvider } from './components/ConfigProvider';


export default function App() {
  const pokemon = useStore((state) => state.pokemon);
  return (
    <main>
      <AssetLoader>
        <ConfigProvider>
          <Background>
            { !!pokemon ? <Result /> : <LandingPage />}
          </Background>
        </ConfigProvider>
      </AssetLoader>
    </main>
  )
}

