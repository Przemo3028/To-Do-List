{
    const tasks = [
        {
            content: "Zrobić zadanie",
            done: false,
        },
        {
            content: "Iść do domu",
            done: false,
        },
        {
            content: "iść spać",
            done: false,
        },
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>
            ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };
    
    init();
}