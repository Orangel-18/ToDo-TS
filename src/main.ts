import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';
import './style.css';
import {v4} from 'uuid';

const form = document.querySelector<HTMLFormElement>('#taskform');

const title = document.querySelector<HTMLInputElement>('#title');

const description = document.querySelector<HTMLTextAreaElement>('#description');

const tasklist = document.querySelector<HTMLDivElement>('#tasklist');

interface Task {
  id:string,
  title:string,
  description:string
}

let tasks: Task[] = [];

form?.addEventListener('submit', e => {
  e.preventDefault();
  
  if (title !== null && description !== null) {
    tasks.push({
      id: v4(),
      title: title?.value,
      description: description?.value
    })
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  Toastify({
    text: 'Task added succesfully',
    position: 'center',
    style: {
      background: "linear-gradient(to right, rgb(30 58 138), rgb(30 58 138))",
    }
  }).showToast();

  form.reset();

  renderTasks(tasks);
  
})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  renderTasks(tasks);
})

function renderTasks(tasks: Task[]) {

  tasklist!.innerHTML = '';

  tasks.forEach(task => {
    const container = document.createElement('div');
    container.className = 'bg-slate-500 px-1 py-2 rounded-md w-11/12 m-1';
    container.innerHTML = `
    <h2>${task.title}</h2>
    <p class = "bg-slate-400 rounded-md px-1 py-3 m-1 hover:ring hover:ring-slate-600">${task.description}</p>
    <button id ="delete" class = "bg-slate-800 hover:ring hover:ring-slate-400 hover:bg-slate-900 px-5 py-1 rounded-md m-1">Delete</button>
    `;
    tasklist?.appendChild(container);

    const delbtn = document.querySelector('#delete');

    delbtn?.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks(tasks);
      Toastify({
        text: 'Task deleted succesfully',
        position: 'center',
        style: {
          background: "linear-gradient(to right, rgb(181, 46, 44), rgb(181, 46, 44))",
        }
      }).showToast();
    })


  })
}


