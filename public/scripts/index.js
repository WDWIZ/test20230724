const form = document.querySelector('#form');
const input = document.querySelector("#input");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = input.value;

    input.value = '';

    fetch('./submit', {
        "method" : "POST",
        "headers" : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        "body" : msg
    })
    .then(res => res.text())
    .then(data => displayMessage(data));
});

function displayMessage(msg){
    const display = document.querySelector("#msg");

    display.innerHTML = msg;
}

async function getMessage(){
    const msg = await fetch('./api')
                        .then(res => res.text())
                        .then(data => displayMessage(data));
}

window.onload = () => {
    getMessage();
    const fetchMessage = setInterval(getMessage, 1000);
}
