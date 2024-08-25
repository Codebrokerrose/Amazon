const xhr = new XMLHttpRequest(); //Creates a new HTTP message to send to the backend. message = request

xhr.addEventListener('load', () => {
    console.log(xhr.response);
}); //listns awaits from events (the response has loaded,)

xhr.open('GET','https://supersimplebackend.dev'); // parameter1: Type of HTTP message(GET = get some information from the backend , POST = create something , PUT = update something , DELETE = delete something) , parameter2: Where to send this HTTP message, we need to use URL(Uniform Resource Locator): Like an address, but for the internet. Helps us locate another computer on the internet.

//list of URL paths : Backend API (application programming interface (how we interact with something)) 


//TYPE OF DATA THAT BACKEND CAN RESPOND WITH : TEXT, JSON, HTML, IMAGE

// // backend supports a certain set of URL paths,if you send a request to a url path that is not supported, the backend will respond with an error.
// xhr.open('GET','https://supersimplebackend.dev/products/first');  //content type json string

xhr.send();
// xhr.response //it takes time for the request to travel across the internet to the backend

//STATUS CODE
//backends gives a status code with each response , starts with 4 (our problem) or 5 (Backend's problem (crash)) (400, 404, 500) = failed , Starts with 2 (200, 201, 204) = succeeded.
