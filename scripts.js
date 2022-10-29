const messagesContainer = document.querySelector(".container-messages")

let mainUser = {
    name: ""

}



mainUser.name = prompt("Digite Seu Nome")

function getMessages() {

}

axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", mainUser)
.then(function(response) {
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






