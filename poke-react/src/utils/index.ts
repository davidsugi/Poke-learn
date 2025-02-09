
export const getAsciiVal = (str: string)=>{
    let letTotal = 0;
  
    for (let i = 0; i < str.length; i++) {
      letTotal+=str.charCodeAt(i);
    }
    return letTotal%1025
  }
  