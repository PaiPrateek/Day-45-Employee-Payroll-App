// Ability to Set Event Listener on Salary Range to display appropriate value

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary—output');
output.textContent=salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});

//On Form Submit populate the Employee Payroll Data Object 

const save = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    try{
        let employeePayrollData = createEmployeePayroll();
        setEmployeePayrollObject();
        createAndUpdateStorage(employeePayrollData);
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch(e){
        return ;
    }
}


const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id)employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollObject = () =>{
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
    if(!empPayrollData){
        employeePayrollList.push(createEmployeePayrollData());
    }
    else{
        const index = employeePayrollList.map(empData._id).indexOf(empPayrollData._id);
        employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
    }
}else{
    employeePayrollList = [employeePayrollData]
}
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes',"");
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}

console.log("End");

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id,value) =>{
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) =>{
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
