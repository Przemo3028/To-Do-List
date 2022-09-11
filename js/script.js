{
    const tasks = [
        {
            content: "Zrobić zadanie",
            done: false,
        },
        {
            content: "Iść do domu",
            done: true,
        },
        {
            content: "iść spać",
            done: false,
        },
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
            <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
            <button class="js-done">Wykonane?</button>
            <button class="js-remove">Usuń</button>
            ${task.content}
            </li> 
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
        
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}