import React from 'react';
import './App.css';
import Background from './components/Background';
import LandingPage from './pages/LandingPage';
import AssetLoader from './components/AssetLoader';
import useStore from './services/store';
import Result from './pages/Result';


export default function App() {
  const pokemon = useStore((state) => state.pokemon);
  console.log(pokemon, !!pokemon)
  return (
    <main>
      <AssetLoader>
        <Background>
          { !!pokemon ? <Result /> : <LandingPage />}
        </Background>
      </AssetLoader>
    </main>
  )
}

