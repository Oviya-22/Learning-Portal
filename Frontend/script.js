/* ==========================================
   LOGIN
========================================== */

async function login() {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");

    message.textContent = "";

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            document.getElementById("loginPage").classList.add("hidden");
            document.getElementById("portal").classList.remove("hidden");

        } else {

            message.textContent = data.message;

        }

    } catch (error) {

        message.textContent = "Unable to connect to server.";

    }

}
/* ==========================================
   REGISTER
========================================== */

async function register() {

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const role = document.getElementById("registerRole").value;

    const message = document.getElementById("registerMessage");

    message.textContent = "";

    try {

        const response = await fetch("http://localhost:5000/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password,
                role
            })

        });

        const data = await response.json();

        if (response.ok) {

            message.style.color = "green";
            message.textContent = "Registration successful!";

            showLogin();

        } else {

            message.style.color = "red";
            message.textContent = data.message;

        }

    } catch (error) {

        message.style.color = "red";
        message.textContent = "Unable to connect to server.";

    }

}
function googleLogin() {

    document
        .getElementById(
            "loginEmail"
        )
        .value =
        "student@gmail.com";


    document
        .getElementById(
            "loginPassword"
        )
        .value =
        "google-login";


    login();

}


function forgotPassword() {

    alert(
        "Password reset link will be sent to your email."
    );

}


function createAccount() {

    alert(
        "Account registration page will be connected later."
    );

}


function logout() {

    document
        .getElementById(
            "portal"
        )
        .classList
        .add("hidden");


    document
        .getElementById(
            "loginPage"
        )
        .classList
        .remove("hidden");


    document
        .getElementById(
            "loginPassword"
        )
        .value = "";

}


/* ==========================================
   PAGE NAVIGATION
========================================== */

const pageInformation = {

    dashboard: {
        title:
            "Dashboard",

        description:
            "Track your learning progress."
    },

    courses: {
        title:
            "Course Management",

        description:
            "Create and manage your courses."
    },

    learning: {
        title:
            "Learning Module",

        description:
            "Access learning materials."
    },

    aiTutor: {
        title:
            "AI Tutor",

        description:
            "Ask questions and understand concepts."
    },

    practice: {
        title:
            "Practice",

        description:
            "Improve your knowledge through practice."
    },

    coding: {
        title:
            "Coding Lab",

        description:
            "Write and test programming code."
    },

    assessment: {
        title:
            "Assessment",

        description:
            "Complete course assessments."
    },

    assignments: {
        title:
            "Assignments",

        description:
            "View and submit assignments."
    },

    certificates: {
        title:
            "Certificates",

        description:
            "View your earned certificates."
    },

    gamification: {
        title:
            "Achievements",

        description:
            "Track XP points and achievements."
    },

    notifications: {
        title:
            "Notifications",

        description:
            "View your latest updates."
    },

    reports: {
        title:
            "Reports",

        description:
            "Generate learning reports."
    },

    settings: {
        title:
            "Settings",

        description:
            "Manage your account."
    }

};


function showPage(
    pageId,
    clickedButton
) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function(page) {

            page.classList
                .remove(
                    "active-page"
                );

        }
    );


    document
        .getElementById(
            pageId
        )
        .classList
        .add(
            "active-page"
        );


    if (
        pageInformation[pageId]
    ) {

        document
            .getElementById(
                "topTitle"
            )
            .textContent =
            pageInformation[
                pageId
            ].title;


        document
            .getElementById(
                "topDescription"
            )
            .textContent =
            pageInformation[
                pageId
            ].description;

    }


    if (clickedButton) {

        const buttons =
            document.querySelectorAll(
                ".nav-button"
            );


        buttons.forEach(
            function(button) {

                button.classList
                    .remove(
                        "active"
                    );

            }
        );


        clickedButton
            .classList
            .add(
                "active"
            );

    }


    window.scrollTo(
        0,
        0
    );

}


/* ==========================================
   COURSE MANAGEMENT
========================================== */

function openCourseForm() {

    document
        .getElementById(
            "courseForm"
        )
        .classList
        .toggle(
            "hidden"
        );

}


function createCourse() {

    const name =
        document
        .getElementById(
            "newCourseName"
        )
        .value;


    const category =
        document
        .getElementById(
            "newCourseCategory"
        )
        .value;


    if (
        name.trim() === ""
    ) {

        alert(
            "Enter a course name."
        );

        return;
    }


    const courseList =
        document
        .getElementById(
            "courseList"
        );


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "module-card";


    card.innerHTML = `

        <div class="module-icon">
            📘
        </div>

        <h2>
            ${name}
        </h2>

        <p>
            Category:
            ${category}
        </p>

        <p>
            New course created successfully.
        </p>

        <button
            class="primary-button"
            onclick="showPage('learning')"
        >
            Open Course
        </button>

    `;


    courseList.appendChild(
        card
    );


    document
        .getElementById(
            "newCourseName"
        )
        .value = "";


    document
        .getElementById(
            "courseForm"
        )
        .classList
        .add(
            "hidden"
        );

}


/* ==========================================
   AI TUTOR
========================================== */

function askAI() {

    const input =
        document
        .getElementById(
            "aiQuestion"
        );


    const question =
        input.value.trim();


    if (
        question === ""
    ) {

        return;

    }


    const chat =
        document
        .getElementById(
            "chatMessages"
        );


    const userMessage =
        document.createElement(
            "div"
        );


    userMessage.className =
        "user-message";


    userMessage.textContent =
        question;


    chat.appendChild(
        userMessage
    );


    const answer =
        document.createElement(
            "div"
        );


    answer.className =
        "bot-message";


    answer.textContent =
        "This is a learning demo. "
        +
        "You asked: "
        +
        question
        +
        ". In the complete project, "
        +
        "this module can be connected "
        +
        "to an AI API.";


    setTimeout(
        function() {

            chat.appendChild(
                answer
            );

            chat.scrollTop =
                chat.scrollHeight;

        },
        500
    );


    input.value = "";

}


/* ==========================================
   PRACTICE QUESTIONS
========================================== */

const practiceData = {

    Java: [

        {
            question:
                "Which keyword is used to create an object in Java?",

            options: [
                "new",
                "class",
                "object",
                "create"
            ],

            answer:
                0
        },

        {
            question:
                "Which method is the entry point of a Java program?",

            options: [
                "start()",
                "main()",
                "run()",
                "begin()"
            ],

            answer:
                1
        }

    ],

    Python: [

        {
            question:
                "Which symbol is used to write a comment in Python?",

            options: [
                "//",
                "#",
                "/*",
                "--"
            ],

            answer:
                1
        },

        {
            question:
                "Which keyword is used to define a function in Python?",

            options: [
                "function",
                "fun",
                "def",
                "method"
            ],

            answer:
                2
        }

    ],

    CSS: [

        {
            question:
                "Which CSS property changes text color?",

            options: [
                "font-color",
                "text-color",
                "color",
                "background"
            ],

            answer:
                2
        },

        {
            question:
                "Which property creates space inside an element?",

            options: [
                "margin",
                "padding",
                "border",
                "gap"
            ],

            answer:
                1
        }

    ]

};


let selectedPracticeCourse =
    "";

let practiceIndex =
    0;

let practiceScore =
    0;

let selectedPracticeAnswer =
    null;


function startPractice(
    course
) {

    selectedPracticeCourse =
        course;

    practiceIndex =
        0;

    practiceScore =
        0;


    document
        .getElementById(
            "practiceCourses"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "practiceQuestionBox"
        )
        .classList
        .remove(
            "hidden"
        );


    document
        .getElementById(
            "practiceResult"
        )
        .classList
        .add(
            "hidden"
        );


    displayPracticeQuestion();

}


function displayPracticeQuestion() {

    selectedPracticeAnswer =
        null;


    const questionData =
        practiceData[
            selectedPracticeCourse
        ][
            practiceIndex
        ];


    document
        .getElementById(
            "practiceNumber"
        )
        .textContent =
        selectedPracticeCourse
        +
        " Question "
        +
        (
            practiceIndex + 1
        )
        +
        " of "
        +
        practiceData[
            selectedPracticeCourse
        ].length;


    document
        .getElementById(
            "practiceQuestion"
        )
        .textContent =
        questionData.question;


    const options =
        document
        .getElementById(
            "practiceOptions"
        );


    options.innerHTML =
        "";


    questionData
        .options
        .forEach(
            function(
                option,
                index
            ) {

                const button =
                    document
                    .createElement(
                        "button"
                    );


                button.className =
                    "option-button";


                button.textContent =
                    option;


                button.onclick =
                    function() {

                        selectPracticeAnswer(
                            index,
                            button
                        );

                    };


                options.appendChild(
                    button
                );

            }
        );

}


function selectPracticeAnswer(
    answer,
    button
) {

    selectedPracticeAnswer =
        answer;


    const buttons =
        document.querySelectorAll(
            "#practiceOptions .option-button"
        );


    buttons.forEach(
        function(item) {

            item.classList
                .remove(
                    "selected"
                );

        }
    );


    button.classList
        .add(
            "selected"
        );

}


function nextPracticeQuestion() {

    if (
        selectedPracticeAnswer ===
        null
    ) {

        alert(
            "Select an answer."
        );

        return;

    }


    const currentQuestion =
        practiceData[
            selectedPracticeCourse
        ][
            practiceIndex
        ];


    if (
        selectedPracticeAnswer ===
        currentQuestion.answer
    ) {

        practiceScore++;

    }


    practiceIndex++;


    if (
        practiceIndex
        <
        practiceData[
            selectedPracticeCourse
        ].length
    ) {

        displayPracticeQuestion();

    }
    else {

        showPracticeResult();

    }

}


function showPracticeResult() {

    document
        .getElementById(
            "practiceQuestionBox"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "practiceResult"
        )
        .classList
        .remove(
            "hidden"
        );


    const total =
        practiceData[
            selectedPracticeCourse
        ].length;


    document
        .getElementById(
            "practiceScore"
        )
        .textContent =
        "Your Score: "
        +
        practiceScore
        +
        " / "
        +
        total;

}


function restartPractice() {

    document
        .getElementById(
            "practiceResult"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "practiceCourses"
        )
        .classList
        .remove(
            "hidden"
        );

}


/* ==========================================
   CODING LAB
========================================== */

function openCodingLab(
    language
) {

    document
        .getElementById(
            "codingCourses"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "codingWorkspace"
        )
        .classList
        .remove(
            "hidden"
        );


    document
        .getElementById(
            "codingLanguage"
        )
        .textContent =
        language
        +
        " Programming";


    const editor =
        document
        .getElementById(
            "codeEditor"
        );


    if (
        language === "Java"
    ) {

        editor.value =
`public class Main {

    public static void main(
        String[] args
    ) {

        System.out.println(
            "Hello World"
        );

    }

}`;

    }
    else if (
        language === "Python"
    ) {

        editor.value =
`print("Hello World")`;

    }
    else {

        editor.value =
`console.log(
    "Hello World"
);`;

    }

}


function runCode() {

    const code =
        document
        .getElementById(
            "codeEditor"
        )
        .value;


    const output =
        document
        .getElementById(
            "codeOutput"
        );


    if (
        code.trim() === ""
    ) {

        output.textContent =
            "Write code before running.";

        return;

    }


    if (
        code.includes(
            "Hello World"
        )
    ) {

        output.textContent =
            "Hello World\n\nProgram executed successfully.";

    }
    else {

        output.textContent =
            "Demo compiler output:\n"
            +
            "Code received successfully.";

    }

}


function submitCode() {

    alert(
        "Code submitted successfully."
    );

}


/* ==========================================
   ASSESSMENT
========================================== */

const assessmentQuestions = {

    Java: [

        [
            "Which keyword creates an object?",
            [
                "new",
                "class",
                "object",
                "create"
            ],
            0
        ],

        [
            "Java is a?",
            [
                "Programming language",
                "Database",
                "Browser",
                "Operating system"
            ],
            0
        ],

        [
            "Which method starts a Java program?",
            [
                "run()",
                "main()",
                "start()",
                "begin()"
            ],
            1
        ],

        [
            "Which keyword defines a class?",
            [
                "object",
                "class",
                "new",
                "define"
            ],
            1
        ],

        [
            "Java supports?",
            [
                "OOP",
                "Only HTML",
                "Only CSS",
                "Only SQL"
            ],
            0
        ],

        [
            "Which is an integer data type?",
            [
                "int",
                "String",
                "boolean",
                "char[]"
            ],
            0
        ],

        [
            "Which operator compares values?",
            [
                "==",
                "=",
                "+",
                "!"
            ],
            0
        ],

        [
            "Which loop repeats code?",
            [
                "for",
                "class",
                "new",
                "import"
            ],
            0
        ],

        [
            "Which keyword inherits a class?",
            [
                "extends",
                "inherits",
                "implements",
                "super"
            ],
            0
        ],

        [
            "Which keyword creates an interface?",
            [
                "interface",
                "class",
                "object",
                "public"
            ],
            0
        ]

    ],


    Python: [

        [
            "Which symbol is a Python comment?",
            [
                "#",
                "//",
                "/*",
                "--"
            ],
            0
        ],

        [
            "Which keyword defines a function?",
            [
                "def",
                "function",
                "fun",
                "method"
            ],
            0
        ],

        [
            "Python uses which indentation?",
            [
                "Whitespace",
                "Brackets only",
                "Semicolon",
                "Colon only"
            ],
            0
        ],

        [
            "Which function prints output?",
            [
                "print()",
                "show()",
                "display()",
                "write()"
            ],
            0
        ],

        [
            "Which is a Python list?",
            [
                "[]",
                "{}",
                "()",
                "<>"
            ],
            0
        ],

        [
            "Which keyword creates a class?",
            [
                "class",
                "object",
                "new",
                "define"
            ],
            0
        ],

        [
            "Which is a Boolean value?",
            [
                "True",
                "Yes",
                "1 only",
                "On"
            ],
            0
        ],

        [
            "Which loop iterates over items?",
            [
                "for",
                "switch",
                "case",
                "goto"
            ],
            0
        ],

        [
            "Which file extension is Python?",
            [
                ".py",
                ".java",
                ".css",
                ".html"
            ],
            0
        ],

        [
            "Python is generally?",
            [
                "Interpreted",
                "Only compiled",
                "A database",
                "A browser"
            ],
            0
        ]

    ],


    CSS: [

        [
            "Which property changes text color?",
            [
                "color",
                "font-color",
                "text-color",
                "background"
            ],
            0
        ],

        [
            "Which property creates inner space?",
            [
                "padding",
                "margin",
                "border",
                "gap"
            ],
            0
        ],

        [
            "Which property changes background?",
            [
                "background-color",
                "font-color",
                "text-color",
                "padding"
            ],
            0
        ],

        [
            "CSS stands for?",
            [
                "Cascading Style Sheets",
                "Computer Style System",
                "Color Style Sheet",
                "Creative Style"
            ],
            0
        ],

        [
            "Which selector selects a class?",
            [
                ".",
                "#",
                "*",
                "@"
            ],
            0
        ],

        [
            "Which selector selects an ID?",
            [
                "#",
                ".",
                "*",
                "@"
            ],
            0
        ],

        [
            "Which property changes font size?",
            [
                "font-size",
                "text-size",
                "font-style",
                "size"
            ],
            0
        ],

        [
            "Which property makes Flexbox?",
            [
                "display: flex",
                "position: flex",
                "flex: display",
                "layout: flex"
            ],
            0
        ],

        [
            "Which property creates outer space?",
            [
                "margin",
                "padding",
                "border",
                "width"
            ],
            0
        ],

        [
            "Which property rounds corners?",
            [
                "border-radius",
                "corner-radius",
                "round",
                "border-round"
            ],
            0
        ]

    ]

};


let assessmentCourse =
    "";

let assessmentIndex =
    0;

let assessmentScore =
    0;

let selectedAssessmentAnswer =
    null;


function startAssessment(
    course
) {

    assessmentCourse =
        course;

    assessmentIndex =
        0;

    assessmentScore =
        0;


    document
        .getElementById(
            "assessmentCourses"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "assessmentBox"
        )
        .classList
        .remove(
            "hidden"
        );


    document
        .getElementById(
            "assessmentResult"
        )
        .classList
        .add(
            "hidden"
        );


    displayAssessmentQuestion();

}


function displayAssessmentQuestion() {

    selectedAssessmentAnswer =
        null;


    const question =
        assessmentQuestions[
            assessmentCourse
        ][
            assessmentIndex
        ];


    document
        .getElementById(
            "assessmentNumber"
        )
        .textContent =
        "Question "
        +
        (
            assessmentIndex + 1
        )
        +
        " / 10";


    document
        .getElementById(
            "assessmentProgress"
        )
        .style.width =
        (
            (
                assessmentIndex
                /
                10
            )
            *
            100
        )
        +
        "%";


    document
        .getElementById(
            "assessmentQuestion"
        )
        .textContent =
        question[0];


    const options =
        document
        .getElementById(
            "assessmentOptions"
        );


    options.innerHTML =
        "";


    question[1]
        .forEach(
            function(
                option,
                index
            ) {

                const button =
                    document
                    .createElement(
                        "button"
                    );


                button.className =
                    "option-button";


                button.textContent =
                    option;


                button.onclick =
                    function() {

                        selectedAssessmentAnswer =
                            index;


                        const allOptions =
                            document
                            .querySelectorAll(
                                "#assessmentOptions .option-button"
                            );


                        allOptions.forEach(
                            function(
                                item
                            ) {

                                item.classList
                                    .remove(
                                        "selected"
                                    );

                            }
                        );


                        button.classList
                            .add(
                                "selected"
                            );

                    };


                options.appendChild(
                    button
                );

            }
        );

}


function nextAssessmentQuestion() {

    if (
        selectedAssessmentAnswer ===
        null
    ) {

        alert(
            "Select an answer."
        );

        return;

    }


    const current =
        assessmentQuestions[
            assessmentCourse
        ][
            assessmentIndex
        ];


    if (
        selectedAssessmentAnswer
        ===
        current[2]
    ) {

        assessmentScore++;

    }


    assessmentIndex++;


    if (
        assessmentIndex
        <
        10
    ) {

        displayAssessmentQuestion();

    }
    else {

        showAssessmentResult();

    }

}


function showAssessmentResult() {

    document
        .getElementById(
            "assessmentBox"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "assessmentResult"
        )
        .classList
        .remove(
            "hidden"
        );


    const percentage =
        assessmentScore
        *
        10;


    document
        .getElementById(
            "assessmentScore"
        )
        .textContent =
        "Your Score: "
        +
        assessmentScore
        +
        " / 10 ("
        +
        percentage
        +
        "%)";


    let message =
        "";


    if (
        percentage >= 80
    ) {

        message =
            "Excellent performance!";

    }
    else if (
        percentage >= 50
    ) {

        message =
            "Good work. Keep practicing.";

    }
    else {

        message =
            "Practice more and try again.";

    }


    document
        .getElementById(
            "assessmentMessage"
        )
        .textContent =
        message;

}


function restartAssessment() {

    document
        .getElementById(
            "assessmentResult"
        )
        .classList
        .add(
            "hidden"
        );


    document
        .getElementById(
            "assessmentCourses"
        )
        .classList
        .remove(
            "hidden"
        );

}


/* ==========================================
   NOTIFICATIONS
========================================== */

function acceptNotification(
    button
) {

    const card =
        button.closest(
            ".notification-card"
        );


    card.innerHTML =
    `
        <div class="notification-symbol">
            ✅
        </div>

        <div class="notification-content">

            <h3>
                Course Invitation Accepted
            </h3>

            <p>
                You have successfully joined
                Advanced Java Programming.
            </p>

        </div>
    `;

}


function declineNotification(
    button
) {

    const card =
        button.closest(
            ".notification-card"
        );


    card.innerHTML =
    `
        <div class="notification-symbol">
            ❌
        </div>

        <div class="notification-content">

            <h3>
                Invitation Declined
            </h3>

            <p>
                The course invitation was declined.
            </p>

        </div>
    `;

}


/* ==========================================
   SETTINGS
========================================== */

function openSetting(
    settingId,
    button
) {

    const contents =
        document.querySelectorAll(
            ".setting-content"
        );


    contents.forEach(
        function(content) {

            content.classList
                .remove(
                    "active-setting-content"
                );

        }
    );


    document
        .getElementById(
            settingId
        )
        .classList
        .add(
            "active-setting-content"
        );


    const tabs =
        document.querySelectorAll(
            ".setting-tab"
        );


    tabs.forEach(
        function(tab) {

            tab.classList
                .remove(
                    "active-setting"
                );

        }
    );


    button.classList
        .add(
            "active-setting"
        );

}


function saveSettings() {

    alert(
        "Settings saved successfully."
    );

}


function toggleTheme() {

    document.body
        .classList
        .toggle(
            "dark-theme"
        );

}


/* ==========================================
   OTHER FUNCTIONS
========================================== */

function submitAssignment() {

    alert(
        "Assignment submitted successfully."
    );

}


function downloadCertificate() {

    alert(
        "Certificate download will start."
    );

}


function generateReport(
    reportType
) {

    alert(
        reportType
        +
        " report generated successfully."
    );

}


/* ==========================================
   SEARCH
========================================== */

function searchPortal() {

    const searchValue =
        document
        .getElementById(
            "globalSearch"
        )
        .value
        .toLowerCase();


    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function(page) {

            const text =
                page.innerText
                .toLowerCase();


            if (
                searchValue !== ""
                &&
                text.includes(
                    searchValue
                )
            ) {

                page.style.outline =
                    "2px solid #5878ca";

            }
            else {

                page.style.outline =
                    "none";

            }

        }
    );

}

function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}