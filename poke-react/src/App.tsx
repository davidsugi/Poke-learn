import React from 'react';
import './App.css';
import Background from './components/HOC/Background';
import LandingPage from './pages/LandingPage';
import AssetLoader from './components/HOC/AssetLoader';
import useStore from './services/store';
import Result from './pages/Result';
import { ConfigProvider } from './components/HOC/ConfigProvider';
import ScreenshotComponent from './components/HOC/ScreenCapt';
import Navigation from './pages/Navigation';
import { ModalWrapper } from './components/HOC/ModalWrapper';

export default function App() {
  const pokemon = useStore((state) => state.pokemon);
  return (
    <main>
    <ModalWrapper>
      <ScreenshotComponent>
        <ConfigProvider>
          <AssetLoader>
            <Background>
              { !!pokemon ? <Result /> : <LandingPage />}
            </Background>
          </AssetLoader>
          <Navigation />
        </ConfigProvider>
      </ScreenshotComponent>
      </ModalWrapper>
    </main>
  );
}


