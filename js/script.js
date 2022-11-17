{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTasks = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTasksDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]

        render();
    };

    const toggleAllTasksDone = () => {

        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    }


    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const bindButtonEvents = () => {
        const allTasksDone = document.querySelector(".js-allDone")

        if (allTasksDone) {
            allTasksDone.addEventListener("click", () => {
                toggleAllTasksDone();
            });
        };

        const hideTasksDone = document.querySelector(".js-hideDone")

        if (hideTasksDone) {
            hideTasksDone.addEventListener("click", () => {
                toggleHideTasksDone();
            });
        };
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTasks(taskIndex);
            });
        });

    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTasksDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list__item" ${task.done && hideDoneTasks ? "hidden" : ""}>
            <button class="list__button js-done"> ${task.done ? "✓" : ""}</button>
            <span class="${task.done ? "list__item--done" : ""}">${task.content}</span>
            <button class="list__button list__button--remove js-remove">🗑️</button>
        </li> 
    `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons")

        if (tasks.length === 0) {
            buttonsElement.innerHTML = ""
            return;
        };

        buttonsElement.innerHTML = `
        <button class="section__button js-hideDone"> ${hideDoneTasks ? "pokaż" : "ukryj"} ukończone</button>
        <button class="section__button js-allDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}> ukończ wszystkie</button>
        `

    };

    const render = () => {

        renderTasks();
        renderButtons();
        bindButtonEvents();
        bindRemoveEvents();
        bindToggleDoneEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask")
        const newTask = newTaskContent.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newTaskContent.value = "";
        };

        newTaskContent.focus();
    };

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
};