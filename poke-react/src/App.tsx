import React from 'react';
import './App.css';
import Background from './components/HOC/Background';
import LandingPage from './pages/LandingPage';
import AssetLoader from './components/HOC/AssetLoader';
import useStore from './services/store';
import Result from './pages/Result';
import { ConfigProvider } from './components/ConfigProvider';
import ScreenshotComponent from './components/HOC/ScreenCapt';


export default function App() {
  const pokemon = useStore((state) => state.pokemon);
  return (
    <main>
      <ScreenshotComponent>
      <AssetLoader>
        <ConfigProvider>
          <Background>
              { !!pokemon ? <Result /> : <LandingPage />}
          </Background>
        </ConfigProvider>
      </AssetLoader>
     </ScreenshotComponent>
    </main>
  )
}

