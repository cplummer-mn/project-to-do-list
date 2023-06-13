import Storage from "./Storage";
import Project from "./Project";
import Data from "./Data";
import Task from "./Task";
import projectIcon from '../assets/images/project.png';
import { compareAsc, format, differenceInDays, parseISO } from 'date-fns';

const main = document.getElementById('main-content');

const sidebarContent = document.getElementById('sidebar-content');

export default class UI {
    static loadPage() {
        UI.loadData();
        UI.loadListeners();
    }

    static loadListeners() {
        const addTaskButton = document.getElementById('add-task-button');
        addTaskButton.addEventListener('click', UI.openTaskMenu);

        const addProjectButton = document.getElementById('add-project-button');
        addProjectButton.addEventListener('click', UI.openProjectMenu);

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
            UI.loadSideBar();
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
                    Storage.updateData(data);
                    project.display();
                }
            }
            main.removeChild(taskMenu);
        });
    }

    static openProjectMenu() {        
        const projectMenu = document.createElement('div');
        projectMenu.id = 'project-menu';
        //projectMenu.onsubmit = 'return false';

        const projectMenuInput = document.createElement('input');
        projectMenuInput.id = 'project-menu-input';
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';

        projectMenu.appendChild(projectMenuInput);
        projectMenu.appendChild(submitButton);
        sidebarContent.appendChild(projectMenu);

        submitButton.addEventListener('click', 
        (e) => {
            const newProject = new Project(projectMenuInput.value, projectMenuInput.value);
            Storage.addProject(newProject);
            console.log(Storage.getData());

            UI.addProjectToSidebar(newProject, true);
            Storage.selectProject(newProject);

        });
    }

    static loadSideBar() {
        const data = Storage.getData();
        for(const project of data.projects) {
            if(project.name == 'Default Project' || project.name == 'Today Project' || project.name == 'This Week Project') {
                // Do Nothing
            }
            else {
                this.addProjectToSidebar(project, false);
            }
        }
    }

    static addProjectToSidebar(project, isNew) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('projects');
        projectElement.id = project.name;

        const projectImage = new Image();
        projectImage.src = projectIcon;

        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.name;

        projectElement.appendChild(projectImage);
        projectElement.appendChild(projectTitle);

        if(isNew) {
            sidebarContent.removeChild(document.getElementById('project-menu'));
        }
        sidebarContent.insertBefore(projectElement, document.getElementById('add-project-button'));

        console.log('added project to sidebar');

        projectElement.addEventListener('click', 
        (e) => {
            console.log(`${project.name} was clicked`);
            Storage.selectProject(project);
            project.display();
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
                if(project.name == 'Today Project') {
                    UI.displayTodayProject();
                }
                else if(project.name == 'This Week Project') {
                    UI.displayThisWeekProject();
                }
                else {
                    console.log('displaying ' + project.name);
                    project.select();
                    project.display();
                }
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

        const todaysDate = new Date();
        console.log(todaysDate);
        for(const project of data.projects) {
            for(const task of project.tasks) {
                console.log(task.dueDate);
                if(differenceInDays(todaysDate, parseISO(task.dueDate)) == 0) {
                    task.displayTask();
                }
            }
        }

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

        const todaysDate = new Date();
        console.log(todaysDate);
        for(const project of data.projects) {
            for(const task of project.tasks) {
                console.log(task.dueDate);
                const diff = differenceInDays(todaysDate, parseISO(task.dueDate));
                if(diff <= 0 && diff > -7) {
                    task.displayTask();
                }
            }
        }
    }
}