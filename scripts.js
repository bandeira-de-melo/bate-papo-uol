const messagesContainer = document.querySelector(".container-messages")
let messages, messagesWithType;
let mainUser = {
    name: ""
}
let chatUser = {
    from: "",
	to: "",
	text: "",
	type: "",
	time: "08:01:17"
}


let otherUsers = {
    
}


mainUser.name = prompt("Digite Seu Nome")

function getMessages() {
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then(function(response){
        messages = (response.data)
        messages.forEach(message => {
            if(message.type === "message"){
                messagesContainer.innerHTML += `
                <div class="enter-message-container white-bg">
                    <p class="enter-messege">${""}tempo <span>${message.from}</span>${message.text}</p>
                </div>
                `
            } else if(message.type === "private_message") {
                messagesContainer.innerHTML += `
                <div class="enter-message-container pink-bg">
                    <p class="enter-messege">${""}tempo <span>${message.from}</span>${message.text}</p>
                </div>
                `
            } else {
                messagesContainer.innerHTML += `
                <div class="enter-message-container">
                    <p class="enter-messege">${""}tempo <span>${message.from}</span>${message.text}</p>
                </div>
                `
            }
            
        })
    }).catch(error => { console.log(error.status)})
}

axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", mainUser)
.then(function(response) {
    getMessages()
    enterRoom()
}).catch(function(error) {
    if(error.status === 400){
        console.log("oi")
    }error.response
})





function enterRoom () {
    messagesContainer.innerHTML += `
    <div class="enter-message-container">
        <p class="enter-messege">${""}tempo <span>${mainUser.name}</span> entra na sala</p>
    </div>
    
    `
}






