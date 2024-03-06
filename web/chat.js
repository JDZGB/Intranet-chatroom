function send(){
    var message = document.getElementById('box').value;
    if(!message){
        alert("请输入内容");
        return;
    }
    message = '';
    socket.emit('sendMessage',message);
    document.getElementById('overflow-container').innerHTML += `<li class="my-message">
            <div class="media__object">
                <img src="2.jpg" alt="Tony" />
            </div>
            <div class="media__body">
                <p>${message}</p>
            </div>
        </li>`;
}