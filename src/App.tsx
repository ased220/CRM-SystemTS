
import { filterFetch } from "./API";
import InputTask from "./components/InputTasks"

function App() {

  filterFetch('completed')
  .then(response => {
    console.log('Total amount:', response);
  })
  .catch(error => console.error('Ошибка запроса:', error));
  return (
    <>
      <InputTask/>
    </>
  )
}

export default App
