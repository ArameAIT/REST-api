import { useEffect, useState } from 'react'
function App() {

const [data, setData] = useState([])

useEffect(()=>{
  fetch("http://localhost:4000/todos", {mode : "no-cors"})
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
}, [])

console.log(data);
console.log(1);

  return (
    <div>
      Helloo
    </div>
  )
}

export default App
