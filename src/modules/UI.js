import Storage from "./Storage";
import Project from "./Project";
import Data from "./Data";
import Task from "./Task";

const main = document.getElementById('main-content');

export default class UI {
    static loadPage() {
        UI.loadData();
        UI.loadListeners();
    }

    static loadListeners() {
        const addTaskButton = document.getElementById('add-task-button');
        addTaskButton.addEventListener('click', UI.openTaskMenu);

        const defaultProjectTitle = document.getElementById('default-project');
        defaultProjectTitle.addEventListener('click', UI.displayDefaultProject);

        const todayProjectTitle = document.getElementById('today-project-title');
        todayProjectTitle.addEventListener('click', UI.displayTodayProject);

        const thisWeekProjectTitle = document.getElementById('this-week-project-title');
        thisWeekProjectTitle.addEventListener('click', UI.displayThisWeekProject);

    }

    static loadData() {
        if (localStorage.getItem('data') === null) {
            Storage.createDefaults();
            const data = Storage.getData();
            for(const project of data.projects) {
                if(project.name == 'Default Project') {
                    project.select();
                }
            }
            Storage.updateData(data);
        }
        else {
            console.log(Storage.getData());
            UI.loadSelected();
        }
    }

    static openTaskMenu() {
        console.log('Add task button clicked');
        
        const taskMenu = document.createElement('form');
        taskMenu.id = 'task-menu';

        const taskMenuInput = document.createElement('input');
        const taskMenuDate = document.createElement('input');
        taskMenuDate.type = 'date';
        const taskMenuSubmitButton = document.createElement('button');
        taskMenuSubmitButton.type = 'button';
        taskMenuSubmitButton.textContent = 'Add Task';

        taskMenu.appendChild(taskMenuInput);
        taskMenu.appendChild(taskMenuDate);
        taskMenu.appendChild(taskMenuSubmitButton);

        main.appendChild(taskMenu);

        taskMenuSubmitButton.addEventListener('click', 
        (e) => {
            const newTask = new Task(taskMenuInput.value, taskMenuDate.value);
            console.log(newTask);

            const data = Storage.getData();
            for(const project of data.projects) {
                if(project.isSelected) {
                    console.log('adding ' + newTask.name + ' to ' + project.name);
                    project.addTask(newTask);
                    project.display();
                }
            }
            Storage.updateData(data);

            main.removeChild(taskMenu);
        });
    }

    static selectProject(elementID) {
        UI.deselectProjects();
        const element = document.getElementById(elementID);
        element.classList.add('selected');
    }

    static deselectProjects() {
        const projects = document.getElementsByClassName('projects');
        for(const project of projects) {
            project.classList.remove('selected');
        }
    }

    static loadSelected() {
        console.log('Loading selected project');
        const data = Storage.getData();
        console.log(data);
        for(const project of data.getProjects()) {
            if(project.isSelected) {
                console.log('displaying ' + project.name);
                project.select();
                project.display();
            }
            else {
                console.log('no project selected, fix this');
            }
        }
    }

    static displayDefaultProject() {
        const data = Storage.getData();
        for(const project of data.projects) {
            if(project.isSelected) {
                project.deselect();
            }
        }
        for(const project of data.projects) {
            if(project.name == 'Default Project') project.select();
        }
        Storage.updateData(data);
        console.log(Storage.getData());
    }

    static displayTodayProject() {
        const data = Storage.getData();
        for(const project of data.projects) {
            if(project.isSelected) {
                project.deselect();
            }
        }
        for(const project of data.projects) {
            if(project.name == 'Today Project') {
                project.select();
            }
        }
        Storage.updateData(data);
        console.log(Storage.getData());
    }

    static displayThisWeekProject() {
        const data = Storage.getData();
        for(const project of data.projects) {
            if(project.isSelected) {
                project.deselect();
            }
        }
        for(const project of data.projects) {
            if(project.name == 'This Week Project') project.select();
        }
        Storage.updateData(data);
        console.log(Storage.getData());
    }
}