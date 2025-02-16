import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { INITIAL_POKEMON_IMG } from '../../const';
import Loader from '../Loader';
import Bag from '../../assets/img/Bag.png';
import Bg from '../../assets/img/Bg.jpeg';
import Hands from '../../assets/img/Hands.png';
import Pokeball from '../../assets/img/Pokeball.png';
import Prompt from '../../assets/img/Prompt.png';
import { motion } from 'framer-motion';

type AssetLoaderProps = {
    children: React.ReactNode;
}

const AssetLoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: white;
    img {
        width: 100px;
        height: 100px;
    }   
`

const PREFETCHED_IMAGES = [
  Bag,
  Bg,
  Hands,
  Pokeball,
  Prompt,
]

export default function AssetLoader({children}: AssetLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const allImages = [...INITIAL_POKEMON_IMG, ...PREFETCHED_IMAGES];
      const totalImages = allImages.length;
      let loadedImages = 0;

      const incrementLoadedImages = () => {
        loadedImages += 1;
        setProgress((loadedImages / totalImages) * 100);
      };

      for (const url of allImages) {
        await fetch(url)
          .then(response => response.blob())
          .then(incrementLoadedImages)
          .catch(error => console.error('Error loading image:', error));
      }
    };
    loadImages();
  }, []);

  if(progress === 100) {
    return  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>{children}</motion.div>;
  }

  return ( 
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <AssetLoaderContainer>
        <Loader />
        <div>Progress: {progress.toFixed(2)}%</div>
      </AssetLoaderContainer>
    </motion.div>
  );
}
