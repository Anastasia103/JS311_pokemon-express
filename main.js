const { response } = require("express")
let express = require("express")

let PORT = 8080

let app = express()

app.use(express.json())

app.listen(PORT, function(){
    console.log("Application started on port", PORT)
})

let db = [];

// get all pokemon
app.get("/pokemon", function (request, response){
    console.log("GET /pokemon")
    response.json(db)
})

// get one pokemon given an id
app.get("/pokemon/:id", function (request, response){
    console.log("GET /pokemon/:id")
    let myID = request.params.id
    let result = db.find(function(item, index){
        return item.id == myID
    })
    if(result){
        response.json(result)
    } else {
        response.json(null)
    }
})

// delete a pokemon given the ID

app.delete("/pokemon/:id", function(request, response){
    console.log("DELETE /pokemon/:id")
    let myID = request.params.id
    let matchingIndex = db.findIndex(todo => todo.id == myID)
    if (matchingIndex < 0){
        response.json(null)
    } else {
        let deletedItem = db.splice(matchingIndex, 1)
        response.json(deletedItem)
    }
})

// create a new pokemon
app.post("/pokemon", function(request, response){
    console.log('POST /pokemon')
    let names = request.body.name
    let id = getRandomInt()
    let inYourParty = true

// actually creates the new Pokemon
    let newPokemon = {}
    newPokemon.name = names
    newPokemon.id = id
    newPokemon.inYourParty = inYourParty
// adds the Pokemon to the array
    db.push(newPokemon)
// returns the Pokemon to the response
    response.json(newPokemon)
})

app.put("/pokemon/:id", function(request, response){
    console.log('PUT /pokemon/:id')

    let myID = request.params.id
    let names = request.body.name
    let inYourParty = request.body.inYourParty

    let matchingItem = db.find(function(item, index){
        return item.id == myID
    })
    if(matchingItem){
        matchingItem.name = names
        matchingItem.inYourParty = inYourParty
        response.json(matchingItem)
    } else {
        response.json(null)
    }
})
    
    let getRandomInt = function() {
        let randomFloat = Math.random()
        let bigRandomFloat = randomFloat * 1000000
        let randomInt = Math.floor(bigRandomFloat)
        return randomInt
     }