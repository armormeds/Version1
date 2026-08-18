const STORAGE_KEY = 'daymark-tasks';

const loadTasks = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
};

let tasks = loadTasks();
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const empty = document.querySelector('#empty-state');
const progressBar = document.querySelector('#progress-bar');
const progressLabel = document.querySelector('#progress-label');

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

function render() {
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task${task.done ? ' done' : ''}`;
    const check = document.createElement('input');
    check.type = 'checkbox'; check.className = 'task-check'; check.checked = task.done;
    check.setAttribute('aria-label', `Mark ${task.text} complete`);
    check.addEventListener('change', () => { task.done = check.checked; save(); render(); });
    const text = document.createElement('span'); text.className = 'task-text'; text.textContent = task.text;
    const remove = document.createElement('button'); remove.className = 'delete'; remove.textContent = '×';
    remove.setAttribute('aria-label', `Delete ${task.text}`);
    remove.addEventListener('click', () => { tasks = tasks.filter(({ id }) => id !== task.id); save(); render(); });
    item.append(check, text, remove); list.append(item);
  });
  empty.hidden = tasks.length > 0;
  const complete = tasks.filter(({ done }) => done).length;
  const percent = tasks.length ? Math.round((complete / tasks.length) * 100) : 0;
  progressLabel.textContent = `${complete} of ${tasks.length} complete`;
  progressBar.style.width = `${percent}%`;
  progressBar.parentElement.setAttribute('aria-valuenow', percent);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: crypto.randomUUID(), text, done: false });
  save(); render(); form.reset(); input.focus();
});

document.querySelector('#today').textContent = new Intl.DateTimeFormat('en', { weekday:'long', month:'long', day:'numeric' }).format(new Date());
document.querySelector('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
render();
