const STORAGE_KEY = 'todoListTasks';

const InputTarefas = document.querySelector('.texto');
const botaoMais = document.querySelector('.mais');
const lista = document.querySelector('.lista');

function addTask() {
    const valorInput = InputTarefas.value;

    if (valorInput === '') {
        alert('Escreva alguma coisa, por favor');
        return;
    }

    createTaskElement(valorInput);
    saveTasks();
    lista.style.display = 'block';
    InputTarefas.value = '';
}

function createTaskElement(valorInput, isCompleted = false) {

    if (valorInput === '') {
        alert('Escreva alguma coisa, por favor');
        return;
    }

    const newItem = document.createElement('li');
    newItem.textContent = valorInput;

    if (isCompleted) {
        newItem.classList.add('completed');

    }

    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'X';
    btnApagar.classList.add('btn-apagar');

    btnApagar.addEventListener('click', () => {
        newItem.remove();
        saveTasks();

        if (lista.children.length === 0) {
            lista.style.display = 'none';
        }
    });

    const btnConcluir = document.createElement('button');
    btnConcluir.textContent = "Feito";
    btnConcluir.classList.add('btn-concluir');

    btnConcluir.addEventListener('click', () => {
        newItem.classList.toggle('completed');
        saveTasks();
    });

    const containerBotoes = document.createElement('div');
    containerBotoes.classList.add('botoes-acao')

    containerBotoes.appendChild(btnConcluir);
    containerBotoes.appendChild(btnApagar);

    newItem.appendChild(containerBotoes);

    lista.appendChild(newItem);

    lista.style.display = 'block';

    
}

function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === '[]') {
        return;
    }

    const tasks = JSON.parse(saved);

    tasks.forEach(taskData => {
        createTaskElement(taskData.text, taskData.completed);
    });

    if (tasks.length > 0) {
        lista.style.display = 'block';
    }
}

function saveTasks() {
    const tasks = [];

    lista.querySelectorAll('li').forEach(item => {
        const taskText = item.firstChild.textContent;
        const isCompleted = item.classList.contains('completed');

        tasks.push({
            text: taskText,
            completed: isCompleted
        });
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}



botaoMais.addEventListener('click', addTask);

InputTarefas.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

loadTasks();