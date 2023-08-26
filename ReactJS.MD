<p align="center">Learning and understanding React states,Hooks,events, event listners, event listner attributes, event handlers and functions used in this project</p>

## States
### searchResults
- searchResults is initially set to an empty array([]) using useState Hook.
- setSearchResults- is a function provided by useState Hook to update the searchResults value.
- findIndex is inbuilt method provided

## Functions
### fetchSearchResults
- To get all relevant names of stocks, the name can be passed and retrieved in 2 ways,
  -  Query
      -  frontend: ```axios.get(api/fetch/?name=${name})```
      -  backend: 
          ```
          app.get("api/fetch/",(response,request)=>{
            name=req.query.name
          })
          ```
  -  Path:
      -  frontend: axios.get(api/fetch/${name})
      -  backend: 
          ```
          app.get("api/fetch/:name",(response,request)=>{
            name=req.params.name
          })
          ```
## Events
In web Development an event is any action that happens in the browser or more specifically inside the DOM.
- example: mouse click, mouse hover, keyboard key press etc.
  1. what is event listners?
     - In vanilla javascript (that is plain JS without any framworks) event listners are methods available for the objects we create for an HTML element.
        ```
        const btn = document.querySelector("button");
        ```
        > Here <stronger>btn</stronger> is the object created for the button element and these object contain methods called eventlistners to listen events (eg: mouseclick) which can be accessed as below.
        ```
        btn.addEventListner("click",
        ()=>{
        console.log("Button cLicked")
        })
        ```
        >  There are 2 parameters to addEventlistner method
        >  - First Parameter: The event(eg:click) itself.
        >  - Second Parameter: The (callback_function)[https://developer.mozilla.org/en-US/docs/Glossary/Callback_function]         >                      ,which will be called when the event occurs.

  2. What is event listner properties?
     - In vanilla javascript event listners properties are properties available for the objects we create for an HTML element.
        ```
        const btn = document.querySelector("button");
        ```
     -  
      
