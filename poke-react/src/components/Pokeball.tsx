import React from 'react'
import styled, {keyframes, css} from 'styled-components'

import Pkbl from "../assets/img/Pokeball.png";
import Hands from './Hands';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
`

type SpriteContainerProps = {
    bgPath: string
    isAnimating?: boolean;
}

const SpriteKeyframes = keyframes`
    from{
        background-position: 0 0;
    }
    to {
        background-position: -920px 0; /* 3 frames * 23px = 69px */
    }
`

const SpriteContainer = styled.div<SpriteContainerProps>`
  background-image: ${(props:SpriteContainerProps)=> props.bgPath};
  background-repeat: no-repeat;
  width: 311px; /* Original width */
  height: 270px; /* Original height */
  transform: scale(0.5); /* Scale down the entire element */
  background-position:-311px 0;
  ${(props) => props.isAnimating && css`
        animation: ${SpriteKeyframes} steps(3) 0.6s infinite alternate;
  `}
`


const MidSpriteContainer = styled.div<SpriteContainerProps>`
  background-image: ${(props:SpriteContainerProps)=> props.bgPath};
  background-repeat: no-repeat;
  width: 150px;
  height: 135px;
  transform: scale(0.5);
  background-position:-155px 0;
  ${(props) => props.isAnimating && css`
        animation: ${SpriteKeyframes} steps(3) 0.6s infinite alternate;
  `}
`

type PokeballProps = {
  isAnimating?: boolean;
}


export default function Pokeball(props:PokeballProps) {
  return (
    <Container>
        <Hands isVisible={props.isAnimating} />
        <SpriteContainer isAnimating={props.isAnimating} bgPath={`url(${Pkbl})`} />
    </Container>
  )
}
