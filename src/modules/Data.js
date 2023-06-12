import Project from './Project';


export default class Data {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Default Project','default-project'));
        this.projects.push(new Project('Today Project', 'today-project-title'));
        this.projects.push(new Project('This Week Project', 'this-week-project-title'));
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProjects() {
        return this.projects;
    }
}