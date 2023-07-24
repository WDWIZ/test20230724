const socket = io();

function submit(){
    const inp = document.querySelector("#input");

    const msg = inp.value;

    inp.value = '';

    socket.emit('new_message', {"msg" : msg});
}

function displayMessage(msg){
    const display = document.querySelector("#msg");

    display.innerHTML = msg;
}

function isInput(e){
    e = e || window.event;
    if (e.keyCode == 13) submit();
}

socket.on('message', (msg) => {
    displayMessage(msg);
});