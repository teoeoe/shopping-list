import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [items, setItems] = useState([])

const [inputValue, setInputValue] = useState("");
const [inputValuePrice, setInputValuePrice] = useState("");

const handleInputChange=(event)=>{
  setInputValue(event.target.value);
}

//price
const handleInputChangePrice=(event)=>{
  const newInput=event.target.value;
  setInputValuePrice(newInput);
}

const handleAddButtonClick=()=>{
  const newItem={itemName:inputValue, quantity: 1, isSelected: false, price:inputValuePrice};
  const newItems=[...items,newItem];
  if(inputValue && (inputValuePrice/2))
{  setItems(newItems);
  setInputValue("");
  setInputValuePrice("")}
}


const handleQuantityIncrease=(index)=>{
  const newItems=[...items];
  newItems[index].quantity++;
  setItems(newItems);
}

const handleQuantityDecrease=(index)=>{
  const newItems=[...items];
  if(newItems[index].quantity>1)
  newItems[index].quantity--;
  setItems(newItems);
}

const handleCompleted=(index)=>{
  const newItems=[...items];
  newItems[index].isSelected=!newItems[index].isSelected;
  setItems(newItems);
}

return(
  <div className="app-background">
    <div className="main-container">
      <div className="add-item-box">
      <input value={inputValue} onChange={handleInputChange} className="add-item-input" placeholder="Add item..."/>
      <input value={inputValuePrice} onChange={handleInputChangePrice} className="add-item-input" placeholder="Add price..."/>
      <FontAwesomeIcon className="icon-style" onClick={()=>handleAddButtonClick()} icon={faPlus} /> 
      </div>
     
      <div className="item-list">

         {items.map((elem,index)=> {return (
         <div className="item-container">

           <div className="item-name" onClick={()=>handleCompleted(index)}>
           {elem.isSelected ? <><FontAwesomeIcon icon={faCheckCircle} /><span className="completed">{elem.itemName}</span></>:<><FontAwesomeIcon icon={faCircle}  />
						<span>{elem.itemName}</span></>}
          </div>

{/* price */}
          <div className="price-container"><span className="price">{elem.price}$</span></div>
{/* /price */}

          <div className="quantity">
            <button><FontAwesomeIcon icon={faChevronLeft} onClick={()=>handleQuantityDecrease(index)} /></button>
            <span>{elem.quantity}</span>
            <button><FontAwesomeIcon icon={faChevronRight} onClick={()=> handleQuantityIncrease(index)} /></button>
          </div>
          
          </div>) })}

      </div>

      <div className='total'>Total: {items.filter((elem)=> elem.isSelected==false).map((elem)=>elem.quantity*elem.price).reduce((prevVal,currVal)=>prevVal+currVal,0)} $
      </div>
    </div>
  </div>

);
}

export default App;
