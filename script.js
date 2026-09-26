// WEB DEVELOPMENT WEBSITE
const CREATOR = "Tarun Dev";

// 2. MOBILE MENU
const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// 3. DARK / LIGHT MODE
const themeBtn = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// 4. SMOOTH SCROLL
document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// 5. PROJECTS DATA
const myProjects = [
  {
    title: "My Portfolio Website",
    description: "My personal portfolio website created using HTML and CSS.",
    technologies: "HTML, CSS",
    link: "https://rountatarun.github.io/tarun-dev-portfolio/",
  },
  {
    title: "To-Do List",
    description:
      "A task management app created using HTML, CSS and JavaScript.",
    technologies: "HTML, CSS, JavaScript",
    link: "https://rountatarun.github.io/to-do-list/",
  },
  {
    title: "Calculator",
    description: "A simple calculator created using JavaScript.",
    technologies: "HTML, CSS, JavaScript",
    link: "https://rountatarun.github.io/JS-Calculator/",
  },
];

// DISPLAY PROJECTS
function displayProjects() {
  const projectsContainer = document.querySelector("#my-projects-container");

  if (!projectsContainer) return;

  projectsContainer.innerHTML = "";

  myProjects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p>
          <strong>Technologies:</strong>
          ${project.technologies}
        </p>
        <a
          href="${project.link}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn"
        >
          View Project ↗
        </a>
      </div>
    `;

    projectsContainer.appendChild(card);
  });
}

displayProjects();

// 6. NOTES
const defaultNotes = [
  {
    title: "HTML Handwritten Notes",
    category: "HTML",
    content: "My handwritten HTML notes",
    file: "notes/HTML_Handwritten_Notes.pdf",
  },
  {
    title: "CSS Handwritten Notes",
    category: "CSS",
    content: "My handwritten CSS notes",
    file: "notes/CSS_Handwritten_Notes.pdf",
  },
  {
    title: "JavaScript Handwritten Notes",
    category: "JavaScript",
    content: "My handwritten JavaScript notes",
    file: "notes/JavaScript_Handwritten_Notes.pdf",
  },
  {
    title: "Web Fundamentals Notes",
    category: "Web Fundamentals",
    content: "Complete Web Fundamentals notes",
    file: "notes/Web_Fundamentals_Notes.pdf",
  },
];

// LOAD NOTES FROM LOCAL STORAGE
let savedNotes = JSON.parse(localStorage.getItem("tarunDevNotes"));

if (!savedNotes) {
  savedNotes = defaultNotes;
  localStorage.setItem("tarunDevNotes", JSON.stringify(savedNotes));
}

// DISPLAY NOTES
function displayNotes() {
  const notesContainer = document.querySelector("#notes-container");

  if (!notesContainer) return;

  notesContainer.innerHTML = "";

  if (savedNotes.length === 0) {
    notesContainer.innerHTML = `
      <div class="note-card">
        <h3>No Notes Found</h3>
        <p>Click "Add New Note" to create your first note.</p>
      </div>
    `;
    return;
  }

  savedNotes.forEach((note, index) => {
    const noteCard = document.createElement("article");
    noteCard.className = "note-card";

    noteCard.innerHTML = `
      <span class="note-category">${note.category}</span>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-buttons">
        <button class="download-note-btn" data-index="${index}">📥 Download</button>
        <button class="delete-note-btn" data-index="${index}">🗑 Delete</button>
      </div>
    `;

    notesContainer.appendChild(noteCard);
  });

  document.querySelectorAll(".download-note-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      downloadNote(index);
    });
  });

  document.querySelectorAll(".delete-note-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      deleteNote(index);
    });
  });
}

displayNotes();

// 7. ADD NEW NOTES
const addNoteBtn = document.querySelector("#add-note-btn");

if (addNoteBtn) {
  addNoteBtn.addEventListener("click", () => {
    const title = prompt("Enter Note Title:");
    if (!title || title.trim() === "") return;

    const category = prompt("Enter Category: HTML / CSS / JavaScript");
    if (!category || category.trim() === "") return;

    const content = prompt("Write your note:");
    if (!content || content.trim() === "") return;

    const newNote = {
      title: title.trim(),
      category: category.trim(),
      content: content.trim(),
    };

    savedNotes.push(newNote);
    localStorage.setItem("tarunDevNotes", JSON.stringify(savedNotes));
    displayNotes();
    alert("Note added successfully! ✅");
  });
}

// 8. DOWNLOAD NOTE
function downloadNote(index) {
  const note = savedNotes[index];
  if (!note) return;

  if (note.file) {
    const link = document.createElement("a");
    link.href = note.file;
    link.download = note.file.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const text = `TARUN DEV - WEB DEVELOPMENT NOTES\n\n----------------------------------------\n\nTitle:\n${note.title}\n\nCategory:\n${note.category}\n\n----------------------------------------\n\n${note.content}\n\n----------------------------------------\n\nCreated on Tarun Dev Learning Platform\n`;

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = note.title.replace(/[^a-z0-9]/gi, "-").toLowerCase() + ".txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 10. SEARCH NOTES
const noteSearch = document.querySelector("#note-search");

if (noteSearch) {
  noteSearch.addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();
    const noteCards = document.querySelectorAll(".note-card");

    noteCards.forEach((card) => {
      const text = card.innerText.toLowerCase();
      if (text.includes(searchText)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// 11. PRACTICE SYSTEM
const practiceRunButtons = document.querySelectorAll(".run-practice-btn");
let practiceProgress =
  JSON.parse(localStorage.getItem("tarunDevPractice")) || {};

function updatePracticeScore() {
  const totalTasks = 3;
  let completedTasks = 0;

  if (practiceProgress.html === true) completedTasks++;
  if (practiceProgress.css === true) completedTasks++;
  if (practiceProgress.javascript === true) completedTasks++;

  const score = document.querySelector("#practice-score");
  if (score) {
    score.innerText = `${completedTasks} / ${totalTasks} Completed`;
  }
}

function checkHTML(code) {
  const lowerCode = code.toLowerCase();
  return {
    h1: lowerCode.includes("<h1>"),
    p: lowerCode.includes("<p>"),
    img: lowerCode.includes("<img"),
    a: lowerCode.includes("<a "),
  };
}

function checkCSS(code) {
  const lowerCode = code.toLowerCase();
  return {
    padding: lowerCode.includes("padding"),
    border: lowerCode.includes("border"),
    background: lowerCode.includes("background-color"),
  };
}

function checkJavaScript(code) {
  return {
    variable:
      code.includes("let ") || code.includes("const ") || code.includes("var "),
    function: code.includes("function"),
  };
}

practiceRunButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const task = button.dataset.task;
    const editor = document.querySelector(
      `.practice-editor[data-task="${task}"]`,
    );
    const result = document.querySelector(`#result-${task}`);

    if (!editor || !result) return;

    const code = editor.value.trim();

    if (!code) {
      result.innerHTML = "⚠️ Please write some code first.";
      result.className = "practice-result error";
      return;
    }

    let checks;

    if (task === "html") checks = checkHTML(code);
    if (task === "css") checks = checkCSS(code);
    if (task === "javascript") checks = checkJavaScript(code);

    const failedChecks = Object.entries(checks).filter(
      ([name, passed]) => !passed,
    );

    if (failedChecks.length === 0) {
      practiceProgress[task] = true;
      localStorage.setItem(
        "tarunDevPractice",
        JSON.stringify(practiceProgress),
      );
      result.innerHTML = "🎉 Great! Task completed successfully.";
      result.className = "practice-result success";
      button.innerText = "Completed ✓";
      updatePracticeScore();
    } else {
      const missing = failedChecks.map(([name]) => name).join(", ");
      result.innerHTML = `❌ Not completed yet.<br>Missing: <strong>${missing}</strong>`;
      result.className = "practice-result error";
    }
  });
});

practiceRunButtons.forEach((button) => {
  const task = button.dataset.task;
  if (practiceProgress[task] === true) {
    button.innerText = "Completed ✓";
  }
});

const resetPracticeBtn = document.getElementById("reset-practice-btn");

if (resetPracticeBtn) {
  resetPracticeBtn.addEventListener("click", () => {
    localStorage.removeItem("tarunDevPractice");
    location.reload();
  });
}

updatePracticeScore();

// 13. FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    if (answer) {
      answer.classList.toggle("active");
    }
  });
});

// 14. SCROLL TO TOP
const topButton = document.querySelector("#scroll-top");

if (topButton) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      topButton.classList.add("show");
    } else {
      topButton.classList.remove("show");
    }
  });

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 15. REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

// 16. CURRENT YEAR
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.innerText = new Date().getFullYear();
}

// 17. CONSOLE MESSAGE
console.log("Tarun Dev Learning Platform Loaded Successfully 🚀");

// 18. Copy Email Script
const copyEmailBtn = document.getElementById("copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", () => {
    const emailToCopy = "rountatarun@gmail.com";
    navigator.clipboard.writeText(emailToCopy).then(() => {
      copyEmailBtn.innerText = "✅ Email Copied!";
      setTimeout(() => {
        copyEmailBtn.innerText = "📋 Copy Email";
      }, 2000);
    });
  });
}

// Contact Form Handler Script
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.innerText = "Thanks! Your message has been sent successfully.";
    contactForm.reset();

    setTimeout(() => {
      formStatus.innerText = "";
    }, 4000);
  });
}
