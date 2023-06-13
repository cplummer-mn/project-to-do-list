import Icon from '../assets/images/x.png'
import Hamburger from '../assets/images/hamburger.png';
import Storage from './Storage';

const main = document.getElementById('main-content');

var inEditMode = false;


export default class Task {
    constructor(name, dueDate) {
        this.name = name;
        this.dueDate  = dueDate;
        this.description = 'No description';
        this.priority = 'Low';
        this.isBig = false;
    }

    displayTask() {
        
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskMainContent = document.createElement('div');
        taskMainContent.classList.add('task-main-content');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';

        const taskName = document.createElement('h3');
        taskName.id = 'task-name';
        taskName.textContent = this.name;

        const taskDueDate = document.createElement('h3');
        taskDueDate.textContent = this.dueDate;

        const myIcon = new Image();
        myIcon.src = Icon;
        myIcon.id = 'x-icon';

        const taskSecondaryContent = document.createElement('div');
        taskSecondaryContent.classList.add('task-secondary-content');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = this.description;

        const taskPriorityDiv = document.createElement('div');
        taskPriorityDiv.classList.add('dropdown');

        const taskPriority = document.createElement('button');
        taskPriority.textContent = this.priority;
        taskPriority.classList.add('dropbtn');

        const hamburger = new Image();
        hamburger.src = Hamburger;
        hamburger.id = 'hamburger-icon';

        taskPriorityDiv.appendChild(taskPriority);

        taskMainContent.appendChild(taskCheckbox);
        taskMainContent.appendChild(taskName);
        taskMainContent.appendChild(taskDueDate);
        taskMainContent.appendChild(myIcon);

        taskSecondaryContent.appendChild(taskDescription);
        taskSecondaryContent.appendChild(taskPriorityDiv);

        taskItem.appendChild(taskMainContent);
        taskItem.appendChild(hamburger);

        main.appendChild(taskItem);
        this.isDisplayed = true;

        // Remove Task by clicking the X
        myIcon.addEventListener('click', 
        (e) => {
            console.log('remove task was clicked');
            main.removeChild(taskItem);
            
            Storage.removeTask(this);
        });

        // Expand or Contract Task by clicking on the hamburger
        hamburger.addEventListener('click', 
        (e) => {
            if(this.isBig) {
                this.isBig = false;
                taskItem.removeChild(taskSecondaryContent);
            }
            else {
                this.isBig = true;
                taskItem.insertBefore(taskSecondaryContent, hamburger);
            }
        }); 

        // Change the name of the task
        taskName.addEventListener('click', 
        (e) => {
            
            if (!inEditMode) {
                taskName.contentEditable = true;
                taskName.focus();
                selectElementContents(taskName);
                inEditMode = true;
            }

            taskName.addEventListener('keypress', 
            (e) => {
                if (e.key  === 'Enter') {
                    Storage.changeTaskName(this, taskName.textContent);
                    taskName.contentEditable = false;
                    inEditMode = false;
                }
            });
            
        });

        taskDueDate.addEventListener('click', 
        (e) => {
            
            const changeDueDateMenu = document.createElement('div');
            changeDueDateMenu.id = 'change-due-date-menu';
            const taskMenuDate = document.createElement('input');
            taskMenuDate.type = 'date';
            taskMenuDate.value = this.dueDate;
            const changeDueDateButton = document.createElement('button');
            changeDueDateButton.id = 'change-due-date-button';
            changeDueDateButton.textContent = 'Submit';
            changeDueDateMenu.appendChild(taskMenuDate);
            changeDueDateMenu.appendChild(changeDueDateButton);
            
            if (!inEditMode) {
                taskDueDate.hidden = true;
                taskMainContent.insertBefore(changeDueDateMenu, myIcon);
                inEditMode = true;
            }

            changeDueDateButton.addEventListener('click', 
            (e) => {
                
                Storage.changeTaskDueDate(this, taskMenuDate.value);
                taskDueDate.value = taskMenuDate.value;
                taskMainContent.removeChild(changeDueDateMenu);
                taskDueDate.hidden = false;
                inEditMode = false;
                
            });
        });
        
        // Edit description of the task
        taskDescription.addEventListener('click', 
        (e) => {
            
            if (!inEditMode) {
                taskDescription.contentEditable = true;
                taskDescription.focus();
                selectElementContents(taskDescription);
                inEditMode = true;
            }

            taskDescription.addEventListener('keypress', 
            (e) => {
                if (e.key  === 'Enter') {
                    Storage.changeTaskDescription(this, taskDescription.textContent);
                    taskDescription.contentEditable = false;
                    inEditMode = false;
                }
            });
            
        });
        // Edit the priority of the task

        taskPriority.addEventListener('click',
        (e) => {
            const taskPriorityDropContent =  document.createElement('div');
            taskPriorityDropContent.classList.add('dropdown-content');
            taskPriorityDropContent.innerHTML = "<a id=\"priority-high\">High</a><a id=\"priority-medium\" >Medium</a><a id=\"priority-low\" >Low</a>";

            if(!inEditMode) {
                taskPriorityDiv.appendChild(taskPriorityDropContent);
                taskPriorityDropContent.style.display = 'block';
                const priorityHigh = document.getElementById('priority-high');
                const priorityMedium = document.getElementById('priority-medium');
                const priorityLow = document.getElementById('priority-low');
                priorityHigh.addEventListener('click',
                () => {
                    taskPriorityDropContent.style.display = 'none';
                    taskPriorityDiv.removeChild(taskPriorityDropContent);
                    Storage.changeTaskPriority(this, 'High');
                });
                priorityMedium.addEventListener('click',
                () => {
                    taskPriorityDropContent.style.display = 'none';
                    taskPriorityDiv.removeChild(taskPriorityDropContent);
                    Storage.changeTaskPriority(this, 'Medium');
                });
                priorityLow.addEventListener('click',
                () => {
                    taskPriorityDropContent.style.display = 'none';
                    taskPriorityDiv.removeChild(taskPriorityDropContent);
                    Storage.changeTaskPriority(this, 'Low');
                });
            }
        });
    }

}
