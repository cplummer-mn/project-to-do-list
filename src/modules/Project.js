import UI from "./UI";
import Storage from "./Storage";
import Task from "./Task";

const main = document.getElementById('main-content');

export default class Project {
    constructor(name, id) {
        this.name = name;
        this.tasks = [];
        this.isSelected = false;
        this.id = id;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    select() {
        console.log('selecting ' + this.name);
        this.isSelected = true;
        console.log(this);
        UI.selectProject(this.id);
        this.display();
    }

    deselect() {
        this.isSelected = false;
    }

    isSelected() {
        return this.isSelected;
    }

    display() {
        console.log(this.name + " is being displayed");
        
        const taskItemArray = document.querySelectorAll('.task-item');
        console.log(taskItemArray);
        for(const taskItem of taskItemArray) {
            console.log(taskItem);
            main.removeChild(taskItem);
        }

        for(const task of this.tasks) {
            task.displayTask();
        }
    }
}