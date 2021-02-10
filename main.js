const formAdd = document.querySelector('form.add');
const formSearch = document.querySelector('form.search');
const inputAdd = document.querySelector('.add input');
const inputSearch = document.querySelector('.search input');
const ul = document.querySelector('ul');
const number = document.querySelector('h2 span');
const list = document.getElementsByClassName('liElement');
let shopList = [...list];
const btnClear = document.querySelector(".clear");

// odświeżenie listy
const renderList = () => {
    ul.textContent = "";
    shopList.forEach((product,i) => {
        product.id = i;
        ul.appendChild(product);
    })
    number.textContent = list.length;

    console.log(shopList);
}

// dodanie nowego elementu
const addItem = (e) => {
    e.preventDefault();
    let newItem = inputAdd.value;
    shopList.forEach(product => {
        if(newItem.toLowerCase() === product.textContent.toLowerCase()) {
            // alert('Taki produkt już został dodany');
            newItem = "";
        }
    }); 
    if(newItem === "") {
        inputAdd.value = "";
        return;
    }
    const newLi = document.createElement('li');
    newLi.className = "liElement";
    newLi.innerHTML = `<i class="far fa-square"></i>${newItem}<i class="fas fa-trash-alt"></i>`;
    shopList.push(newLi);
    renderList();
    inputAdd.value = "";

    // ustawienie nasłuchiwania na stworzone ikony w newLi
    newLi.querySelector('.fa-square').addEventListener('click', checkItem);
    newLi.querySelector('.fa-trash-alt').addEventListener('click', removeItem);
}

//skreślanie elementu 
const checkItem = (e) => {
    e.target.parentNode.classList.toggle('crossed');
    if(e.target.className == "far fa-square") {
        e.target.className = "far fa-check-square";
    } else if(e.target.className == "far fa-check-square") {
        e.target.className = "far fa-square";
    }
}

//usuwanie elementu
const removeItem = (e) => {
    const index = e.target.parentNode.id;
    shopList.splice(index, 1);
    renderList();
}

// usuwanie skreślonych elementów
const clearList = () => {
    shopList = shopList.filter(li => !li.classList.contains('crossed'));
    renderList();
}

// wyszukiwanie produktów
const searchItem = (e) => {
    const txt = inputSearch.value.toLowerCase();
    let findItems = shopList.filter(li => li.textContent.toLowerCase().includes(txt));
    ul.textContent = "";
    findItems.forEach(item => ul.appendChild(item));
}

formAdd.addEventListener('submit', addItem);
formSearch.addEventListener('input', searchItem);
btnClear.addEventListener('click', clearList);