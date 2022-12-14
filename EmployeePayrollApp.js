// Ability to Set Event Listener on Salary Range to display appropriate value

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary—output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

//On Form Submit populate the Employee Payroll Data Object 

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        let employeePayrollData = createEmployeePayroll();
        setEmployeePayrollObject();
        createAndUpdateStorage(employeePayrollData);
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }
}


const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        }
        else {
            const index = employeePayrollList.map(empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', "");
    setSelectedIndex('#day', 0);
    setSelectedIndex('#month', 0);
    setSelectedIndex('#year', 0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

console.log("End");

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

//Perform Validation Employee Payroll Data setter methods 
class EmployeePayrollData {
    get id() { return this._id; }
    set id(id) {
        this._id = id;
    }
    get name() { return this._name; }
    set name(name) {
        let nameRegex = new RegExp("^[A-Z]{1}[a-zA-Z]{2,}$")
        if (nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get department() { return this._department; }
    set department(department) {
        this._department = department;
    }
    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get note() { return this._note; }
    set note(note) {
        this._note = note;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        this._startDate = startDate;
        if (startDate > now) throw 'Start Date is a Future Date';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
            throw 'Start Date is beyond 30 days!';
        this.startDate = startDate;
    }

    toString() {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-GB", options);
        return "id=" + this.id + ", name=" + this.name + ", gender=" + this.gender + ", profilepic= " + this.profilePic + ", department= " + this.department + ", salary=" + this.salary + ", startDate= " + empDate + ", note=" + this.note;
    }
}

const date = document.querySelector("#date");
date.addEventListener('input', function () {
    let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    try {
        (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
        setTextValue('.date-error', "");
    }
    catch (e) {
        setTextValue('.date-error', e);
    }
});

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
