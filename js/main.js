let inputTask = document.getElementById("task-input");
let addTask = document.getElementById("add-task");
let tmp;
let listArray;
let mood = "add";

// checkboxInput.checked = localStorage.a === "true";
// document.addEventListener(
//   "change",
//   (event) => {
//     localStorage.a = checkboxInput.checked;
//   },
//   false
// );

if (localStorage.tasks != null) {
  listArray = JSON.parse(localStorage.tasks);
} else {
  listArray = [];
}

addTask.onclick = function () {
  let newTask = {
    taskTitle: inputTask.value,
    completed: false,
  };
  if (inputTask.value != "") {
    if (mood === "add") {
      listArray.push(newTask);
    } else {
      listArray[tmp] = newTask;
      mood = "add";
      addTask.innerHTML = "Add task";
    }
  } else {
    swal("Required field!", "Please try again");
  }

  localStorage.setItem("tasks", JSON.stringify(listArray));

  clearData();
  showData();
};
// checkbox=document.querySelector('tr input[type="checkbox"]');

// checkbox.onChange=function(){

// }

//clear data from input
function clearData() {
  inputTask.value = "";
}
//show data

function showData() {
  // let table = " ";
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < listArray.length; i++) {
    let completed_status = listArray[i].completed;
    let checked = "";
    if (completed_status) {
      checked = "checked";
    }
    ///>*${checked}*/
    document.getElementById("tbody").innerHTML += `
     <tr>
        <td class="taskinfo">
            <input class="checkboxes" id="input${i}" type="checkbox" onchange="check_status(${i},this)" ${checked}>
            <label for="input${i}">${listArray[i].taskTitle}</label>
        </td>
        <td class="actions">
            <i onclick="editData(${i})" class="fa-solid fa-pen edit"></i>
            <i onclick="deleteData(${i})" class="fa-solid fa-trash-can trash"></i>
         </td>
    </tr>
    `;
    if (completed_status) {
      document
        .querySelector(`label[for=input${i}]`)
        .classList.add("tasksTitle");
    } else {
      document
        .querySelector(`label[for=input${i}]`)
        .classList.remove("tasksTitle");
    }
  }
  // document.getElementById("tbody").innerHTML = table;
}

showData();
//delete
function deleteData(i) {
  listArray.splice(i, 1);
  localStorage.tasks = JSON.stringify(listArray);
  showData();
}
//update data
function editData(i) {
  inputTask.value = listArray[i].taskTitle;
  addTask.innerHTML = "Edit Task";
  mood = "edit";
  tmp = i;
}

function check_status(i, e) {
  if (e.checked) {
    listArray[i].completed = true;
  } else {
    listArray[i].completed = false;
  }
  localStorage.tasks = JSON.stringify(listArray);
  showData();
}
