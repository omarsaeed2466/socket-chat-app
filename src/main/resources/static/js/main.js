var userName= null;
var stomp = null ;
var loginElement = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm')

function connectSocket(event) {
    userName = document.querySelector('#username').value.trim();
    if (userName){
loginElement.classList.add("dis");
chatElement.classList.remove("dis");
var socket = new SockJS('connect');
stomp.over();
    }
  event.preventDefault()
}
userForm.addEventListener('submit',connectSocket)