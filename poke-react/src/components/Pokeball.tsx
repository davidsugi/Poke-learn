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
        background-position: -284px 0; /* 3 frames * 23px = 69px */
    }
`

const SpriteContainer = styled.div<SpriteContainerProps>`
  background-image: ${(props:SpriteContainerProps)=> props.bgPath};
  background-repeat: no-repeat;
  width: 95px;
  height: 88px;
  background-position:-97px 0;
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
        {props.isAnimating  && <Hands />}
        <SpriteContainer isAnimating={props.isAnimating} bgPath={`url(${Pkbl})`} />
    </Container>
  )
}
