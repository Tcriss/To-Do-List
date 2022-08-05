const input = document.querySelector('input');
const addBtn = document.querySelector('.btnadd');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');
let tasks = [];
let id = Date.now();

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

function DeleteBtn() {
    
    const deleteBtn = document.createElement("button");
    
    deleteBtn.textContent = "x";
    deleteBtn.className = "btndelete";
    
    deleteBtn.addEventListener("click", (e) => {
        //agarra el LI del boton eleminar
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0){
            empty.style.display = "block";
        }
    });
    return deleteBtn;
}