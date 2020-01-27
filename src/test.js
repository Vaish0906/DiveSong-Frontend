fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(r => r.json().then(data => ({ status: r.status, body: data })))
  .then(obj => console.log(obj));
