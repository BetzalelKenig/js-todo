//import { v4 as uuidv4 } from './node_modules/uuid';

const container = document.querySelector(".container");

// if(window.localStorage.getItem("todoItem") == undefined){
//   let todolist = [];
//    todolist = window.localStorage.getItem("todoItem", JSON.stringify)
//   console.log(window.localStorage.getItem("todoItem", JSON.stringify) == undefined);
// }else {

// }

if (window.localStorage.getItem("todolist") == undefined) {
  let todolist = [];
  window.localStorage.setItem("todolist", JSON.stringify(todolist));
}

let todolist = JSON.parse(window.localStorage.getItem("todolist"));
// let todolist = (window.localStorage.getItem("todoItem", JSON.stringify) ?? []);
console.log(todolist);
let id = 0;
const onAdd = () => {
  let todoval = document.querySelector(".inputtd");
  let dueval = document.querySelector(".datepicker");
  if (todoval.value != "") {
    todolist.push(new todoItem(todoval.value, dueval.value));
    //---------
    console.log(todolist);
    window.localStorage.setItem("todolist", JSON.stringify(todolist));
    todoval.value = "";
  }
};

class todoItem {
  todo;
  due;
  constructor(todo, due) {
    this.todo = todo;
    this.due = due;
    this.addItem(todo, due);
  }

  addItem(todo, due) {
    let todoItem = document.createElement("div");
    todoItem.classList.add("item");
    let d1 = new Date();
    let d2 = new Date(due);
    todoItem.style.borderColor = this.color(due);

    // let check = document.createElement('input');
    // check.type = 'checkbox';
    // check.classList.add('check');

    // let checkmark = document.createElement('span');
    // checkmark.classList.add('checkmark');

    // let check = document.createElement("label");
    // check.classList.add("container1");
    // check.innerHTML = `<input type="checkbox" id='${todolist.indexOf(name)}'>
    // <span class="checkmark"></span>`;

    let check = document.createElement("input");
    check.type = "checkbox";
    check.addEventListener("click", () =>
      this.done(container, todoItem, past, check)
    );

    let past = document.createElement("del");

    let input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    input.value = todo;
    input.classList.add("item_input");

    let inputdue = document.createElement("input");
    inputdue.type = "date";
    inputdue.disabled = true;
    inputdue.value = due;
    inputdue.classList.add("item_input");

    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
    edit.addEventListener("click", () => this.edit(input, inputdue, name, todoItem));

    let remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    remove.addEventListener("click", () => this.remove(todoItem, name));

    container.appendChild(todoItem);

    todoItem.appendChild(check);
    // todoItem.appendChild(checkmark);
    todoItem.appendChild(input);
    todoItem.appendChild(inputdue);
    todoItem.appendChild(edit);
    todoItem.appendChild(remove);
  }
  edit(input, inputdue, name, todoItem) {
    // if (input.disabled == true) {
    //   input.disabled = !input.disabled;
    //   inputdue.disabled = !inputdue.disabled;
    // } else {
    input.disabled = !input.disabled;
    inputdue.disabled = !inputdue.disabled;
    let indexof = todolist.indexOf(name);
    todolist[indexof] = input.value;
    todolist[indexof] = inputdue.value;

    todoItem.style.borderColor = this.color(inputdue.value);
    window.localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  remove(todoItem, name) {
    todoItem.parentNode.removeChild(todoItem);
    let index = todolist.indexOf(name);
    todolist.splice(index, 1);
    window.localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  done(container, todoItem, past, check) {
    if (check.checked == true) {
      container.removeChild(todoItem);
      container.appendChild(past);
      past.appendChild(todoItem);
    } else {
      container.appendChild(past);
      past.appendChild(todoItem);
    }
  }
  color(due) {
    let d1 = new Date();
    let d2 = new Date(due);
    return d2 > d1 ? "green" : "red";
  }
}

for (let item of todolist.sort((a, b) => a.due - b.due)) {
  console.log(new todoItem(item.todo, item.due));
}
