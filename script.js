/* features
    1. user is able to add new employees using a form.
    {
        empName: ``;
        email: ``;
        employeeId: ``;
        company: ``;
        designamtion:``;
    }

    2. Added employes will be displayed( dynamically ) on the webpaage using a table
    3. Every employee added can be deleted.
    4.  Adding edit functionality to previously added employees.

*/


const form = document.getElementById("form");
const tbody = document.getElementById("tbody");
const formBtn = document.getElementById("formBtn");

const employees = []; // array stores list of all employee object present in table;

// Implimenting add employee/submit button functionality for the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // ensures the default behaviour of refreshing page does not occur on submit
  let employee = {
    empName: event.target.empName.value, //event.target reffers to form in this context
    email: event.target.email.value, //event.target.email reffers to the input of form elemnet which has email as name value
    empId: event.target.empId.value,
    company: event.target.company.value,
    designation: event.target.designation.value,
  };
  // console.log(employee);
  // we need to add this object inside the tables <tr>.
  //to do so we call funtion(1) add employee
  addEmployee(employee);
});

//function 1.> This function will take an object and add its key value pairs accordingly into the table.
function addEmployee(employee) {
  // if the enetered employee already exists in the list it would show an alert and not add the employee to the list
  formBtn.innerText="Add Employee";
  for (let i = 0; i < employees.length; i++) {
    let emp = employees[i];
    if (emp.email === employee.email) {
      alert("Email already in use.");
      return;
    } else if (emp.empId === employee.empId) {
      alert("Employee Id already exists");
      return;
    }
  }

  // making a new tr element containing details of employee to be added
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td>${employee.empName}</td>
        <td>${employee.email}</td>
        <td>${employee.empId}</td>
        <td>${employee.company}</td>
        <td>${employee.designation}</td>
        <td>
            <button class="delBtn" onclick="deleteEmployee(this)" data-empId="${employee.empId}">Delete</button>
            <button class="editBtn" onclick="editEmployee(this)" data-empId="${employee.empId}">Edit</button>
        </td>
    `;

  // appends the tr to the tbody of table
  tbody.appendChild(tr);

  employees.push(employee);
  //after adding employee to the table, we will clear form entries.
  form.reset();
}

// function 2.> Delete employee function implementation, called on-click of dynamically added delete btn.
function deleteEmployee(btnRef) {
    // console.log(btnRef);
  let empId = btnRef.getAttribute("data-empId");
  // remove from employees array list
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].empId === empId) {
      employees.splice(i, 1); // deletes 1 object starting from index i
      break;
    }
  }

  // remove that employee from the table .i.e, remove it from the dom tree.
  // to extract the tr refference of the delete-btn row ,
  let parentTd = btnRef.parentNode;
  let parentTr = parentTd.parentNode;
  // or let parentTr = btnRef.parentNode.parentNode;
  parentTr.remove(); // removes the tr from dom tree
}

//function 3.> Edit employee feature implementaion, called on-click of dynamically added delete btn.
function editEmployee(btnRef){
    let empId = btnRef.getAttribute("data-empId");
    // console.log(empId, btnRef);
    formBtn.innerText="Save Changes";
    let empTobeEdited;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].empId === empId) {
          empTobeEdited = employees[i];
          break;
        }
      }
    // console.log(empTobeEdited);
//  employee details to be edited will be moved back to form
    for (let key in empTobeEdited) {
        form.elements[key].value = empTobeEdited[key];
    }

//  deleteing the employee entry from table and employees array to allow resubmition.  
    let delBtnRef = btnRef.previousElementSibling;
    deleteEmployee(delBtnRef);
}