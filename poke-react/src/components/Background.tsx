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
    column-gap: 10vw;
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
    transform: translateY(-12vw);
`

export default function Background(props:{children:React.ReactNode}) {

  const handPos = useStore((state) => state.handPosition);

  return (
    <BgContainer bg={background}>
        <ContentContainer>
            {props.children}
        </ContentContainer>
        <BgInnerContainer>
            <img src={Bag} alt="bag icon"/>
            <PokeballContainer>
                {new Array(3).fill(0).map((_, i) => 
                    <Pokeball key={i} isAnimating={i === handPos} />
                )}
            </PokeballContainer>
        </BgInnerContainer>
    </BgContainer>
  )
}
