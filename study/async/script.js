// fetch('https://jsonplaceholder.typicode.com/todos/1')
//    .then((response) => response.json())
//    .then((json) => console.log(json))
//    .then(() => fetch('http://jsonplacehddddolder.typicode.com/todos/2'))
//    .then((response) => response.json())
//    .then((json) => console.log(json))
//    .catch((error) => console.log(error))
//    .finally(() => console.log('finally'));

async function fetchTodos() {
   try {
      const response1 = await fetch(
         'https://jsonplaceholder.typicode.com/todos/1',
      );
      const json1 = await response1.json();
      console.log(json1);

      const response2 = await fetch(
         'https://jsonplaceholder.typicode.com/todos/2',
      );
      const json2 = await response2.json();
      console.log(json2);
   } catch (error) {
      console.log(error);
   } finally {
      console.log('finally');
   }
}

fetchTodos();
