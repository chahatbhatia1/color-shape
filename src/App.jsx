import { useState } from "react";
import "./App.css";

function App() {
	const [shapeMatrix, setShapeMatrix] = useState([
		[false, false, false],
		[false, null, null],
		[false, false, false],
	]);
   const [colouredBoxes, setColouredBoxes] = useState([]);

   const areAllBoxColoured = (shapeMatrix) => {
      for(let i=0; i<shapeMatrix.length; i++) {
         for(let j=0; j<shapeMatrix[i].length; j++) {
            if(shapeMatrix[i][j] === false) {
               return false;
            }
         }
      }
      return true;
   }

   const handleClick = (e, rowIndex, colIndex) => {
      const clickedBox = e.target;
      let shapeClone = [...shapeMatrix];

      if(colouredBoxes.includes(clickedBox.id)) {
         clickedBox.style.backgroundColor = "white";
         let tempColouredBoxes = colouredBoxes.filter(boxId => boxId !== clickedBox.id);
         shapeClone[rowIndex][colIndex] = false;

         setColouredBoxes(tempColouredBoxes);
         setShapeMatrix(shapeClone);
      } else {
         clickedBox.style.backgroundColor = "green";
         shapeClone[rowIndex][colIndex] = true;

         setColouredBoxes([...colouredBoxes, clickedBox.id]);
         setShapeMatrix(shapeClone);

         if(areAllBoxColoured(shapeClone)) {
            let currIndex = 0;
            let colouredBoxesClone = [...colouredBoxes, clickedBox.id];

            let intervalId = setInterval(() => {
               console.log(currIndex, colouredBoxesClone);
               if(currIndex >= colouredBoxesClone.length) {
                  clearInterval(intervalId);
                  resetState();
                  return;
               }
               const clickedElem = document.getElementById(colouredBoxesClone[currIndex]);
               clickedElem.style.backgroundColor = "white";
               currIndex++;
            }, 1000);
         }
      }
   }

   const resetState = () => {
      const shapeClone = [...shapeMatrix];

      for(let i=0; i<shapeClone.length; i++) {
         for(let j=0; j<shapeClone[i].length; j++) {
            if(shapeClone[i][j] !== null) {
               shapeClone[i][j] = false;
            }
         }
      }
      
      setColouredBoxes([]);
      setShapeMatrix(shapeClone);
   }

	return (
		<div>
			<h1>Color/uncolor the shape</h1>

         <div className="shape">
            {shapeMatrix.map((row, rowIndex) => (
               <div key={`row-${rowIndex}`} id={`row-${rowIndex}`} className="row">
                  {row.map((col, colIndex) => {
                     if(col !== null) {
                        return (
                           <div 
                              key={`box-${rowIndex}${colIndex}`}
                              id={`box-${rowIndex}${colIndex}`}
                              className="box"
                              onClick={(e) => handleClick(e, rowIndex, colIndex)}
                           ></div>)
                     } else {
                        return null
                     }
                  })}
               </div>
            ))}
         </div>
		</div>
	);
}

export default App;
