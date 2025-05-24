import { filterFetch } from "./API";


function App() {

  filterFetch('completed')
  .then(response => {
    console.log('Total amount:', response);
  })
  .catch(error => console.error('Ошибка запроса:', error));
  return (
    <>

    </>
  )
}

export default App
