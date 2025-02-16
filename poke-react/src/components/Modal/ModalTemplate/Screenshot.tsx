import React from 'react'
import styled from 'styled-components';
import { ReactComponent as Save } from '../../assets/icons/Save.svg';
import { ReactComponent as Share } from '../../assets/icons/Share.svg';

type ScreenshotModalProps = {
    src: string
}

const ScreenshotImage = styled.img`
    width:100%;
    object-fit:contain;
`;

const ScreenshotModalContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ScreenshotModalButtonsContainer = styled.div`
    margin-top: 1vw;
    display: flex;
    gap: 2vw;
    align-items: center;
    justify-content: center;
    svg {
        width: 3vw;
        height: 3vw;
    }
    svg path {
        fill: black !important;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    padding: 0.5vw;
    border-radius: 50%;
    border: solid #eded;
    align-items: center;
    justify-content: center;
`;

// Utility function to resize a Base64 image using a canvas
function resizeImage(base64Str:string, maxWidth:number, maxHeight:number, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // Ensure crossOrigin is set in case of external images
      img.crossOrigin = 'anonymous';
      img.src = base64Str;
      img.onload = () => {
        // Calculate the new dimensions while preserving aspect ratio
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        
        // Create a canvas with the new dimensions
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        
        // Draw the scaled image onto the canvas
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Convert canvas back to a Base64 string (JPEG format allows quality control)
        const resizedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(resizedDataUrl);
      };
      img.onerror = (err) => reject(err);
    });
  }
  

export default function ScreenshotModal({src}:ScreenshotModalProps) {
   const ButtonLinks = [
        {
            icon: <Save />,
            onClick: ()=>{
                   const downloadFile= async () =>{
                        const link = document.createElement('a');
                        link.href = await resizeImage(src, 800, 600, 0.7);
                        link.download = `My_Poke_Bestie${new Date().toDateString()}`;
                        // Append to the document to make the click work in Firefox
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                    downloadFile();
            }
        },
        {
            icon: <Share />,
            onClick: ()=>{
                
            }
        }
   ];

   const renderMenu = () =>{
        return ButtonLinks.map((button)=> <ButtonsContainer onClick={button.onClick}>{button.icon}</ButtonsContainer>)
   }

  return (
    <ScreenshotModalContainer>
        <ScreenshotImage src={src} alt="Screenshot of the page" />
        <ScreenshotModalButtonsContainer>
            {renderMenu()}
        </ScreenshotModalButtonsContainer>
    </ScreenshotModalContainer>
  )
}
