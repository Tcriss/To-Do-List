const input = document.querySelector('input');
const addBtn = document.querySelector('.btnadd');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
const mode = document.querySelector('i');
let tasks = [];
let id = Date.now();

showTasks();

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value;

    if (text !== "") {

        const task = {
            text,
            id
        }
        tasks = [...tasks,task]

        localStorage.setItem('tasks',JSON.stringify(tasks));
        const p = document.createElement('p');
        p.textContent = text;
              
        const li = document.createElement('li');
        li.appendChild(p);
        li.appendChild(DeleteBtn());
        ul.appendChild(li);
        
        input.value = "";
        empty.style.display = "none";
        ul.style.height = "30vh";
    } else {
        Message('','Alto ahi!','No puedes agregar listas vacias');
    }
});

function showTasks(){
    document.addEventListener('DOMContentLoaded',() => {
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = `${task.text}`;
            li.appendChild(p);
            li.setAttribute("id", `${task.text}`);
            li.appendChild(DeleteBtn());
            ul.appendChild(li);
            empty.style.display = "none";
        });
    });
}

function DeleteBtn(e) {
    const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="30" height="25"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>'
    deleteBtn.setAttribute("id", id);
    deleteBtn.className = "btndelete";
    
    deleteBtn.addEventListener("click", (e) => {
        const task = e.target.parentElement;
        ul.removeChild(task);
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(e, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const items = document.querySelectorAll("li");
        if (items.length == 0){
            empty.style.display = "block";
            ul.style.height = "1vh";
        }
    });
    return deleteBtn;
}

function Message(icono,titulo,mensaje){
    Swal.fire({
        position: 'center',
        icon: icono,
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__shakeX'
          },
          hideClass: {
            popup: 'animate__animated animate__bounceOut'
          }
    });
}

var dark_mode = JSON.parse(localStorage.getItem('pageView'));

function darkMode(){
    if (dark_mode == true){
        document.querySelector('.container').style.backgroundColor = "#04293A";
        document.querySelector('ul').style.backgroundColor = "#04293A";
        document.querySelector('#toogle').style.color = "white";
        document.querySelector('h1').style.color = "white";
        empty.style.color = "white";

        dark_mode = false;
        localStorage.setItem('pageView',JSON.stringify(dark_mode));
    } else {
        document.querySelector('.container').style.backgroundColor = "rgb(255, 255, 255)";
        document.querySelector('ul').style.backgroundColor = "";
        document.querySelector('#toogle').style.color = "black";
        document.querySelector('h1').style.color = "darkslategrey";
        empty.style.color = "black";

        dark_mode = true;
        localStorage.setItem('pageView',JSON.stringify(dark_mode));
    }
}