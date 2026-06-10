const xhr = new XMLHttpRequest();

// code that runs after loading of response
xhr.addEventListener('load', () => {
    console.log(xhr.response);
})
// send a msg using this object. The msg can be of diff types: GET, POST, PUT, DELETE
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();

//resposne immediately not available. so we will use eventListener with xhr object