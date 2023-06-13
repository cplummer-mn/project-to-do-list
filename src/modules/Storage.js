import Data from "./Data";
import Project from "./Project";
import Task from "./Task";
import UI from "./UI";


export default class Storage {
    static createDefaults() {
        console.log('creating defaults');
        localStorage.setItem('data', JSON.stringify(new Data()));
    }

    // Turn Data from localStorage back into objects. 
    static getData() {
        
        const data = Object.assign(new Data(), JSON.parse(localStorage.getItem('data')));

        data.projects = data.projects.map((project) => Object.assign(new Project(), project));

        data.projects.forEach(project => {
            project.tasks = project.tasks.map((task) => Object.assign(new Task(), task));
        });
        
        return data;
    }

    static updateData(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    static addProject(project) {
        const data = Storage.getData();
        data.projects.push(project);
        Storage.updateData(data);
    }

    static selectProject(project) {
        const data = Storage.getData();
        for(const element of data.projects) {
            element.deselect();
        }
        for(const element of data.projects) {
            if(element.name == project.name) {
                element.select();
            }
        }
        Storage.updateData(data);
    }

    static removeTask(taskToRemove) {
        const data = Storage.getData();
        for(const project of data.projects) {
            for(const task of project.tasks) {
                if(task.name == taskToRemove.name) {
                    project.tasks.splice(project.tasks.indexOf(task), 1);
                }
            }
        }
        Storage.updateData(data);
        UI.loadSelected();
    }

    static changeTaskName(taskToChange, newName) {
        const data = Storage.getData();
        for(const project of data.projects) {
            for(const task of project.tasks) {
                if(task.name == taskToChange.name) {
                    task.name = newName;
                }
            }
        }
        Storage.updateData(data);
        UI.loadSelected();
    }

    static changeTaskDescription(taskToChange, newDescription) {
        const data = Storage.getData();
        for(const project of data.projects) {
            for(const task of project.tasks) {
                if(task.name == taskToChange.name) {
                    task.description= newDescription;
                }
            }
        }
        Storage.updateData(data);
    }

    static changeTaskDueDate(taskToChange, newDueDate) {
        const data = Storage.getData();
        for(const project of data.projects) {
            for(const task of project.tasks) {
                if(task.name == taskToChange.name) {
                    task.dueDate = newDueDate;
                }
            }
        }
        Storage.updateData(data);
    }

    static changeTaskPriority(taskToChange, newPriority) {
        const data = Storage.getData();
        for(const project of data.projects) {
            for(const task of project.tasks) {
                if(task.name == taskToChange.name) {
                    task.priority = newPriority;
                }
            }
        }
        Storage.updateData(data);
        UI.loadSelected();
    }
}