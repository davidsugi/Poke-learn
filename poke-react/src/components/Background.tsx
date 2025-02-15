import React from 'react'
import styled from 'styled-components';
import background from '../assets/img/Bg.jpeg';
import Pokeball from './Pokeball';
import Bag from "../assets/img/Bag.png";
import useStore from '../services/store';

type BgContainerProps = {
    bg: string;
  }
  const BgContainer = styled.div<BgContainerProps>`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      background-repeat: no-repeat;
      background-size: cover;
      background-position-x: center;
      ${({ bg }) => bg && `background-image: url(${bg});`}
  `
const PokeballContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-8vh);
    > *:nth-child(2){
        transform: translateY(7vw);
    }
`
const ContentContainer = styled.div`
    position: absolute;
    display: flex;
    z-index: 1;
`

const BgInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translateY(-15vw);
    width: 100vw;
`

const generateTextShadow = (thickness: number) => {
    let css = ``
    let targetThickness = thickness;
    while(targetThickness > 0){
        css+=`
            -${targetThickness}vw -${targetThickness}vw 0 #0000FF,  
            ${targetThickness}vw -${targetThickness}vw 0 #0000FF,
            -${targetThickness}vw ${targetThickness}vw 0 #0000FF,
            ${targetThickness}vw ${targetThickness}vw 0 #0000FF
        `
        const nextThickness =Math.round(targetThickness / 2 * 100) / 100
        if(nextThickness === targetThickness){
            targetThickness = 0;
        }
        else{
            targetThickness = nextThickness; // Round to 2 decimal places
            css+=", "
        }
    }   
    return css
};

const textShadowCSS = generateTextShadow(0.6)

const Title = styled.h1`
  font-family: 'PokeFont', sans-serif;
  font-size: 2rem;
  position: absolute;
  transform: translateY(-5vh);
  font-size: 11vw;
  color: yellow;
  text-shadow: ${textShadowCSS};
`

const BagImage = styled.img`
    width:50vw;
    max-height: 40vh;
    object-fit: contain;
`

export default function Background(props:{children:React.ReactNode}) {

  const handPos = useStore((state) => state.handPosition);

  return (
    <BgContainer bg={background}>
        <ContentContainer>
            {props.children}
        </ContentContainer>
        <BgInnerContainer>
        <Title>My  Poke Bestie</Title>
        <BagImage src={Bag} alt="bag icon"/>
            <PokeballContainer>
                {new Array(3).fill(0).map((_, i) => 
                    <Pokeball key={i} isAnimating={i === handPos} />
                )}
            </PokeballContainer>
        </BgInnerContainer>
    </BgContainer>
  )
}
