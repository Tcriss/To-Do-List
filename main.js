const input = document.querySelector('input');
const addBtn = document.querySelector('.btnadd');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');

addBtn.addEventListener("click", (e) => {
    //Prevenir que la pagina recargue
    e.preventDefault();

    //Recoge el texto del campo
    const text = input.value;

    if (text !== "") {
        //aqui se crea un nuevo list item
        const li = document.createElement('li');
        //se crea un parrafo para ser trasladado al list item anterior
        const p = document.createElement('p');
        p.textContent = text;
        
        //aqui finalmente se inserta el Li
        li.appendChild(p);
        li.appendChild(DeleteBtn());
        ul.appendChild(li);
        
        input.value = "";
        empty.style.display = "none";
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

function DeleteBtn() {
    
    const deleteBtn = document.createElement("button");
    
    deleteBtn.textContent = "x";
    deleteBtn.setAttribute("id", id);
    deleteBtn.className = "btndelete";
    
    deleteBtn.addEventListener("click", (e) => {
        const task = e.target.parentElement;
        ul.removeChild(task);
        let tasks = JSON.parse( localStorage.getItem('tasks'))
        tasks.splice(e, 1);
        console.log(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const items = document.querySelectorAll("li");
        if (items.length === 0){
            empty.style.display = "block";
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
    });
}