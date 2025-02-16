import React from 'react'
import styled from 'styled-components'
import ShareIcon from "../assets/icons/Share.svg";
import GithubIcon from "../assets/icons/Github.svg";
import SaveIcon from "../assets/icons/Save.svg";
import useStore from '../services/store';
import { useScreenshot } from '../components/HOC/ScreenCapt';

const NavigationContainer = styled.div`
    position: absolute;
    z-index:1;
    top:0;
    right:0;
    padding: 1vw 2vw;
    display: flex;
    gap: 1vw;

`
const NavButton = styled.img`
  object-fit: contain;
  width: 3vw;
  height: 3vw;
`
const NAVIGATION_LIST = [
  {
    icon:ShareIcon,
    link:"https://trakteer.id/davsugi/link",
  },
  {
    icon:GithubIcon,
    link:"https://github.com/davidsugi",
  }
]

export default function Navigation() {
  const pokemon = useStore((state) => state.pokemon);
  const {handleScreenshot} = useScreenshot();
  const renderList = ()=>{
    return NAVIGATION_LIST.map((item)=> <NavButton onClick={()=> window.location.replace(item.link)} src={item.icon} />)
  }

  const handleOnSave = ()=>{
    handleScreenshot();
  }

  return (
    <NavigationContainer>
      { renderList() }
      {pokemon && <NavButton onClick={handleOnSave} src={SaveIcon} />}
    </NavigationContainer>
  )
}
