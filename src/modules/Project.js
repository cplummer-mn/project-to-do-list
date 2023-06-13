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
        
        const addTaskButton = document.getElementById('add-task-button');

        if(this.name == 'Today Project' || this.name == 'This Week Project') {
            addTaskButton.hidden = true;
        }
        else {
            addTaskButton.hidden = false;
        }

        const taskItemArray = document.querySelectorAll('.task-item');
        console.log(taskItemArray);
        for(const taskItem of taskItemArray) {
            console.log(taskItem);
            main.removeChild(taskItem);
        }
        const data = Storage.getData();
        for(const project of data.projects) {
            if(project.name == this.name) {
                console.log(project.name + " is being displayed");
                console.log(project);
                for(const task of project.tasks) {
                    task.displayTask();
                }
            }
        }
    }
}