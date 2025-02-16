import React, { useRef, ReactNode, createContext, useContext } from 'react';
import html2canvas from 'html2canvas';
import { useModal } from './ModalWrapper';
import ScreenshotModal from '../Modal/ModalTemplate/Screenshot';
import { useConfig } from './ConfigProvider';

interface ScreenshotComponentProps {
    children: ReactNode;
  }
  // Create a context to store the screenshot function and the ref
const ScreenshotContext = createContext({handleScreenshot: ()=>{}});

  const ScreenshotComponent: React.FC<ScreenshotComponentProps> = ({ children }) => {
  // Create a ref for the element to capture
  const captureRef = useRef(null);
  const CONFIG = useConfig().MODAL;
  const { openModal} = useModal();

  // Function to handle screenshot capturing
  const handleScreenshot = () => {
    if (captureRef.current) {
      // Pass the target element to html2canvas
      html2canvas(captureRef.current, {
        useCORS: true,       // enable cross-origin images if needed
        allowTaint: false,   // if false, it prevents tainted canvas issues
      })
        .then((canvas) => {
          // Convert the canvas to a data URL (PNG image)
          const imgData = canvas.toDataURL('image/png');
          openModal(<ScreenshotModal src={imgData} />, CONFIG.SCRENSHOT_TITLE)
        })
        .catch((error) => {
          console.error('Error capturing screenshot:', error);
        });
    }
  };

  return (
    <ScreenshotContext.Provider value={{ handleScreenshot }}>
      <div
        ref={captureRef}
      >  
      {children}
      </div>
    </ScreenshotContext.Provider>
  );
};

export default ScreenshotComponent;



// Custom hook for easy context access
export const useScreenshot = () => useContext(ScreenshotContext);