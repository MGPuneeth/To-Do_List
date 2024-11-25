document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    } 
})

const tasks=[];

const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

const addTask= ()=>{
    const inputTask = document.getElementById('input-task');
    const text = inputTask.value;

    if(text){
        tasks.push({text: text,completed: false});
        inputTask.value='';

        updateTasksList();
        updateStats();
       saveTasks();
    }
    
    
};

const toggleTaskComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index,1);

    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const inputTask =document.getElementById('input-task');
    inputTask.value = tasks[index].text;

    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const updateStats = () =>{
    const completeTasks = tasks.filter(task =>task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100


    const progressbar = document.getElementById("progress");
    console.log(progress);
    
    progressbar.style.width = `${progress}%`;

    const statnumber = document.getElementById('numbers');
    statnumber.textContent = `${completeTasks+"/"+totalTasks}`;

    if(completeTasks === totalTasks && totalTasks!==0){
        celebration();
    }
}

const updateTasksList = () =>{
    const taskList =document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task,index) =>{
        const listItem = document.createElement('li');

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input  class="checkbox" type="checkbox"${task.completed ? 'checked' : ''}/>
                <p>${task.text}</p>
            </div>
            

            <div class="icons">
                <img src="img/edit.png" alt="Edit" onClick="editTask(${index})"/>
                <img src="img/bin.png" alt="Delete" onClick="deleteTask(${index})"/>
            </div>
        </div>`;
        
        listItem.addEventListener('change', ()=> toggleTaskComplete(index));
        taskList.append(listItem);
       
    });
};
const newTask=document.getElementById('new-task');
newTask.addEventListener('click',function(e){
    e.preventDefault();
    addTask();
});


const celebration = () =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}