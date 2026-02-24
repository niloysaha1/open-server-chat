const socket = io('http://localhost:8000')

const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('tin.mp3');

const append=(message , position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value='';
    if(position=='left'){
        audio.play;
    }
});

const name = prompt("ENTER YOUR NAME TO JOIN");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');

})
socket.on('receive', data =>{
    append(`${data.name}:${data.message}`,'left');

})
socket.on('left', name =>{
    append(`${name} left the chat`,'left');

})