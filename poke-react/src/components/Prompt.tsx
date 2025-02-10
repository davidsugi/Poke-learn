import React, { JSX } from 'react'
import PromptImg from "../assets/img/Prompt.png";
import styled from 'styled-components';

type PromptContainerProps = {
    bgPath: string
}

const PromptContainer = styled.div<PromptContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: ${(props:PromptContainerProps)=> props.bgPath};
    background-repeat: no-repeat;
    width: 100vw;
    height: 22vw;
    background-size: contain;
    background-position: center;
    position: absolute;
    bottom: 0;
    max-height: 30vh;
    span{
        font-family: 'CustomFont', sans-serif; 
        font-size: 3vw;
    }
`

type PromptProps = {
    children?: JSX.Element
}

export default function Prompt({children}: PromptProps) {
  return (
        <PromptContainer bgPath={`url(${PromptImg})`}>
            {
                children ?? <span>
                Search your Pokemon Soul mate. <br></br>
                The one that's destined for you
            </span>
            }
        </PromptContainer>
  )
}
