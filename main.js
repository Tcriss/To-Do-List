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
        alert("No puedes agregar un campo vacio");
    }
    
});

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