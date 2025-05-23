import { useState } from "react";
import { postFetch } from "../API";

export default function InputTask( ) {

  const [inputValue, setInputValue] = useState('');
  const [inputError, setIputError] = useState('');
  const onClick = () =>{
    if (inputValue.length >= 2 && inputValue.length <= 64 ){

              postFetch({
                  title : inputValue,
                  isDone: false,
              })
              setIputError('')
      } else {
          setIputError('Error')            
      }
      setInputValue('')
  }

  return (
    <div className="inputTask">
            <div>

                <input 
                    className= { inputError == 'Error'? 'input-error': ''}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Task to be done...' 
                />
                { inputError == 'Error'? <p className="errorText"> Введите значение от 2 до 64 </p>: ''}
                
            </div>
            <button onClick={ () => onClick() }>Add</button>
        </div>
  )
}