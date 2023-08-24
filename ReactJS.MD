<p align="center">Understanding React Hooks and states used in this project</p>

### searchResults
- searchResults is initially set to an empty array([]) using useState Hook.
- setSearchResults- is a function provided by useState Hook to update the searchResults value.
- findIndex is inbuilt method provided

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
