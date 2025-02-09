import React from 'react'
import styled, {keyframes, css} from 'styled-components'

import Pkbl from "../assets/img/Pokeball.png";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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
        background-position: -72px 0; /* 3 frames * 23px = 69px */
    }
`


const SpriteContainer = styled.div<SpriteContainerProps>`
  background-image: ${(props:SpriteContainerProps)=> props.bgPath};
  background-repeat: no-repeat;
  width: 25px;
  height: 22px;
  transform: scale(2);
  background-position:-23.8px 0;
  ${(props) => props.isAnimating && css`
        animation: ${SpriteKeyframes} steps(3) 0.6s infinite alternate;
  `}
`


export default function Pokeball() {
  return (
    <Container>
        <SpriteContainer bgPath={`url(${Pkbl})`} />
    </Container>
  )
}
