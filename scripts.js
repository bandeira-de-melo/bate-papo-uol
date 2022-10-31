const messagesContainer = document.querySelector(".container-messages")
let messages, messagesWithType;
let mainUser = {
    name: ""
}


let chatUser = {
	from: mainUser.name,
	to: "Todos",
	text: "",
	type: "message", // ou "private_message" para o bônus 
}

mainUser.name = prompt("Digite Seu Nome")

function getMessages() {
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then(function(response){
        messages = (response.data)
        messages.forEach(message => {
            let normalMessage = `
            <div class="enter-message-container white-bg">
                <p class="enter-messege">${""}tempo <span>${message.from}</span> para <span>Todos: </span> ${message.text}</p>
            </div>
            `
            let privateMessage = `
            <div class="enter-message-container pink-bg">
                <p class="enter-messege">${""}tempo <span>${message.from}</span> para ${message.to}: ${message.text}</p>
            </div>
            `
            let otherMessage = `
            <div class="enter-message-container">
                <p class="enter-messege">${""}tempo <span>${message.from}</span> ${message.text}</p>
            </div>
            `
            if(message.type === "message"){
                messagesContainer.innerHTML += normalMessage
            } else if(message.type === "private_message") {
                messagesContainer.innerHTML += privateMessage
            } else {
                messagesContainer.innerHTML += otherMessage
            }
            
        })
    }).catch(error => { if (error.status === 400){ alert(error.message)}})
}

function userStatus() {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", mainUser)
    .then(function(response) {
    getMessages().then(enterRoom())  
    })
    .catch(function(error) {
    console.log(error)
    })
}


//post a message and keep watching for status changes
function postMessage(){
    chatUser.text = document.getElementById("message-input").value
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", chatUser)
    .then(function(response) {
        console.log(response)
    }).catch(function(error) {
        console.log(error)
    })    
}

axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", mainUser)
.then(function(response) {
    getMessages().then(enterRoom())  
}).catch(function(error) {
    if(error.status === 400){
        console.log("oi")
    }error.response
})





function enterRoom () {
    messagesContainer.innerHTML += `
    <div class="enter-message-container">
        <p class="enter-messege">${""}tempo <span>${mainUser.name}</span> entra na sala...</p>
    </div>
    
    `
    setInterval(getMessages, 3000)
    setInterval(userStatus, 5000)
}






