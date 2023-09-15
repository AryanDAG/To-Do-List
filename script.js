const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");    
       // In this line we have created li variable in which we have created element.
        li.innerHTML = inputBox.value;   
        // in this line we have created input field and then we will add this in li variable.
        listContainer.appendChild(li);   
        // In this line we have print li element which is in listContainer class.
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";     // This line clears the placeholder in input text field.
    saveData();
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }

},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

function timer(id, ischeck) {
    if (ischeck) {
        // If the timer is triggered by checking/unchecking the task, call the check function
        check(id);
    }

    let myobj = getData(id);

    if (myobj.status) {
        // If the task is checked, start the timer interval
        interval = setInterval((id) => {
            let ele = document.getElementById(`time${id}`);
            let myobj1 = getData(id);

            // Increment the task time and update the display
            let ttt = ++myobj1.time;
            myobj1 = { ...myobj1, time: ttt }
            ele.innerHTML = myobj1.time + 's';

            // Serialize the updated task object and store it in local storage
            myObj_serialized = JSON.stringify(myobj1);
            localStorage.setItem(myobj1.id, myObj_serialized);
        }, 1000, id);

        // Update the task object with the interval and store it in local storage
        myobj = { ...myobj, interval: interval }
        myObj_serialized = JSON.stringify(myobj);
        localStorage.setItem(myobj.id, myObj_serialized);
    } else {
        // If the task is unchecked, clear the timer interval
        clearInterval(myobj.interval);
    }
}

function init() {
    // Initialize the timers for all tasks
    for (let index = 1; index <= localStorage.length; index++) {
        timer(index);
    }
}

// Call the init function to start the timers
init();