import React, { useRef, ReactNode, createContext, useContext } from 'react';
import html2canvas from 'html2canvas';

interface ScreenshotComponentProps {
    children: ReactNode;
  }
  // Create a context to store the screenshot function and the ref
const ScreenshotContext = createContext({handleScreenshot: ()=>{}});

  const ScreenshotComponent: React.FC<ScreenshotComponentProps> = ({ children }) => {
  // Create a ref for the element to capture
  const captureRef = useRef(null);

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

          // Option 1: Open the image in a new window
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`<img src="${imgData}" alt="Screenshot" />`);
          }

          // Option 2: You could also set the image data into state to display in your component
          // setScreenshot(imgData);
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