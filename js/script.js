{
    const tasks = [
    ];

    const removeTasks = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    }

    const toggleTasksDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTasks(taskIndex);
            })
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTasksDone(taskIndex);
            })
        });
    }


    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class="button js-done"> ${task.done ? "✓" : ""}</button>
                    <span class="list__task ${task.done ? "list__item--done" : ""}">${task.content}</span>
                    <button class="button button--remove js-remove">🗑️</button>
                </li> 
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = newTask.value.trim();

        if (newTask !== "") {
            addNewTask(newTaskContent);
            newTask.value = "";
        };

        newTask.focus();
    }

    const init = () => {

        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}