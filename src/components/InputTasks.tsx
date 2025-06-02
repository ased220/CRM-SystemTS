    import { useState } from "react";
import { postFetch } from "../API";

interface inputTaskProps {
    reloadList: () => void
}

export default function InputTask( {reloadList}: inputTaskProps ) {

  const [inputValue, setInputValue] = useState('');
  const [inputError, setIputError] = useState('');

    const onClick = async() =>{
        try{

            
            if (inputValue.length >= 2 && inputValue.length <= 64 ){
                await postFetch({
                    title : inputValue,
                    isDone: false,
                })
                reloadList()
                setIputError('')
            } else {
                setIputError('Error')            
            }
            setInputValue('')
        } catch (error) {
            console.error(error);
        }
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