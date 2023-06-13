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
        this.priority = 1;
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

        const taskPriority = document.createElement('p');
        taskPriority.textContent = this.priority;

        const hamburger = new Image();
        hamburger.src = Hamburger;
        hamburger.id = 'hamburger-icon';

        taskMainContent.appendChild(taskCheckbox);
        taskMainContent.appendChild(taskName);
        taskMainContent.appendChild(taskDueDate);
        taskMainContent.appendChild(myIcon);

        taskSecondaryContent.appendChild(taskDescription);
        taskSecondaryContent.appendChild(taskPriority);

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


        function selectElementContents(el) {
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

}
