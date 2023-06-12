import Data from "./Data";
import Project from "./Project";
import Task from "./Task";


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
}