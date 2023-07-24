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

async function getMessage(){
    const res = await fetch('./api')
                        .then(res => res.text())
                        .then(data => displayMessage(data));
}

socket.on('message', (msg) => {
    displayMessage(msg);
});

window.onload = () => {
    getMessage();
}