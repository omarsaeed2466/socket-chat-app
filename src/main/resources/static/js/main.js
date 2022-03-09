var userName= null;
var stomp = null ;
var  URL = "http://localhost:8080";
var loginElement = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm')
var connect = document.querySelector('#connect');
var mainChat = document.querySelector('#main-chat');
var sendDiv = document.querySelector('#sendDiv');
var main = document.querySelector('#main');
var sms = document.querySelector('#sms');
var formChat = document.querySelector('#formChat');
function connectSocket(event) {
    userName = document.querySelector('#username').value.trim();
    if (userName){
loginElement.classList.add("dis");
chatElement.classList.remove("dis");
var socket = new SockJS(URL + '/connect');
stomp = Stomp.over(socket);
stomp.connect({},connectedDone)
    }
  event.preventDefault()
}
function connectedDone() {
    stomp.subscribe("/topic/all",sendMessage())
    stomp.send("/app/chat.login",{},JSON.stringify({sender : userName, chatType : 'JOIN'})
    )

    connect.classList.add('dis')
}
function sendMessage(payload) {
    var message = JSON.parse(payload.body)
    if(message.chatType == 'JOIN') {
        joinUser(message,"join")
    }else if (message.chatType=='LEAVE'){

    joinUser(message,"leave");

    }
}
function joinUser(message,state) {
    var li1 =  document.createElement('li')
    var li2 =  document.createElement('li')
    var hr1 =  document.createElement('hr')
    var hr2 =  document.createElement('hr')
    var messageJoin = document.createTextNode(message.sender + " " +state)
    li1.classList.add('status');
    li1.appendChild(messageJoin)
    li2.appendChild(hr1)
    li2.appendChild(li1)
    li2.appendChild(hr2)
    mainChat.appendChild(li2)
}function send() {
    var messageUser =  sms.value.trim()
    if (messageUser && stomp){
        var  userMessage = {
            message: messageUser,
            chatType: 'CHAT',
            sender : userName
        }
        stomp.send("/app/chat.send",{},JSON.stringify(userMessage))
        messageUser.value= '';
    }

    
}
userForm.addEventListener('submit',connectSocket)
sendDiv.addEventListener('click',send)