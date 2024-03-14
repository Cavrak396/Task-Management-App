import View from "./view.js";

class TaskView extends View {
  createTaskBtn = this.parentEl.querySelector(".js-new-task");
  confirmTaskBtn;
  taskSetup;
  task;
  subTaskBtn;
  subTaskInput;
  taskValues = {
    taskName: "",
    taskSubtasks: [],
    taskDescription: "",
  };

  _createTaskForm() {
    this.createTaskBtn.addEventListener("click", () => {
      const markup = `
      <div class="platform__task-setup js-task-setup">
      <button type="button" class="platform__task-close js-closeSetup">
       <img src="././images/close.png" class="platform__close-setup"> 
       </button>
      <span class="platform__task-tag"> Add New Task </span>
      <form class="platform__task-form">
      <label for="title" class="platform__task-label"> Title </label>
      <input type="text" class="platform__task-input js-title-input" id="title" name="title" placeholder="e.g Take coffe break">
      <label for="description" class="platform__task-label"> Description </label>
      <input type="text" class="platform__task-input platform__task-description js-task-desc" id="description" name="description" placeholder="e.g It's always goot to take a break. This is 15 minute to break.">
      <div class="platform__subtask-holder js-subtask-holder">
      <label for="subtask" class="platform__task-label"> Subtasks </label>
      <input type="text" class="platform__task-input js-subtask-input" id="subtask" name="subtask" placeholder="e.g Make coffe">
      <button type="button" class="platform__subtask-button js-subtask-button">+Add New Subtask</button>
      </div>
      <label for="status" class="platform__task-label"> Status </label>
      <select class="platform__task-chooser js-status" id="status" name="status" >
        <option class="platform__task-option">todo</option>
        <option class="platform__task-option">doing</option>
        <option class="platform__task-option">done</option>
      </select>
      <button type="submit" class="platform__newTask-button js-confirmTask-btn"> Create Task </button>
      </form>
      </div>
      `;

      this.parentEl.insertAdjacentHTML("afterbegin", markup);
      this._setupFormElements();
    });
  }

  _setupFormElements() {
    this.confirmTaskBtn = this.parentEl.querySelector(".js-confirmTask-btn");
    this.taskSetup = this.parentEl.querySelector(".js-task-setup");
    this.subTaskBtn = this.parentEl.querySelector(".js-subtask-button");
    this.subTaskInput = this.parentEl.querySelector(".js-subtask-input");
    this._confirmTask();
    this._setupClose();
    this._handleSubtask();
  }

  _setupClose() {
    const closeBtn = this.parentEl.querySelector(".js-closeSetup");
    closeBtn.addEventListener("click", () => {
      closeBtn.closest(".js-task-setup").remove();
    });
  }

  _handleSubtask() {
    this.subTaskBtn.addEventListener("click", () => {
      if (this.subTaskInput.value) {
        const markup = `
     <div class='platform__new-subtasks'>
         <input class="platform__task-input platform__task-input--subtask js-subtask-input" placeholder="e.g Go to walk">
         <button type="button" class="platform__new-subtaskBtn">
             <img src='././images/close.png' class="platform__subtask-close" alt="close icon">
         </button>
     </div>
            `;

        this.subTaskInput.insertAdjacentHTML("afterend", markup);

        const removeBtn = this.parentEl.querySelector(
          ".platform__new-subtaskBtn"
        );

        removeBtn.addEventListener("click", () => {
          const subtaskContainer = removeBtn.closest(".platform__new-subtasks");
          subtaskContainer.remove();
        });
      }
    });
  }

  _confirmTask() {
    this.confirmTaskBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const taskName = this.parentEl.querySelector(".js-title-input").value;
      const subtaskInputs = this.parentEl.querySelectorAll(".js-subtask-input");
      const subtaskName = Array.from(subtaskInputs).map((input) => input.value);
      const taskDescription =
        this.parentEl.querySelector(".js-task-desc").value;
      const statusSelect = this.parentEl.querySelector(".js-status");
      const selectOption = statusSelect.value;
      const taskList = this.parentEl.querySelector(`.js-${selectOption}`);
      this.taskValues = {
        taskName: taskName,
        taskSubtasks: subtaskName,
        taskDescription: taskDescription,
      };

      const markup = `
        <li class="platform__task-item js-task">
        <span class="platform__task-name"> ${this.taskValues.taskName}! </span>
        <span class="platform__task-subtask"> ${
          this.taskValues.taskSubtasks[0] !== ""
            ? "You have subtask."
            : "You haven't subtasks."
        } </span>
        </li>
        `;

      if (taskName && ["todo", "doing", "done"].includes(selectOption)) {
        taskList.insertAdjacentHTML("afterbegin", markup);
      }

      this.taskSetup.remove();
      this.task = this.parentEl.querySelector(".js-task");
      this._changeTaskStatus();
    });
  }

  _changeTaskStatus() {
    this.task.addEventListener("click", () => {
      const markup = `
        <div class="platform__task-stats js-stats"> 
          <span class="platform__task-statsTag">${
            this.taskValues.taskName
          }</span>
          <span class="platform__task-date"> date: ${this._getDate().join(
            "."
          )} </span>
          <ul class="platform__task-subtasks">
            ${this.taskValues.taskSubtasks
              .map((subtask) => {
                return `<li class="platform__task-subtaskName"> ${subtask} </li>`;
              })
              .join("")}
          </ul>
          <p class="platform__task-statsDescription"> ${
            this.taskValues.taskDescription
          }</p>
          <button type="button" class="platform__task-remover js-taskStatus-remover"> Remove your task? :) </button>
        </div>
        `;

      this.parentEl.insertAdjacentHTML("afterbegin", markup);

      const removeBtn = this.parentEl.querySelector(".js-taskStatus-remover");
      removeBtn.addEventListener("click", () => {
        const confirmMarkup = `
        <div class="platform__confirm-markup">
        <span class="platform__confirm-question"> Are you sure? </span>
         <div class="platform__confirm-buttons">
          <button type="submit" class="platform__confirm-button js-confirm-accept"> Yes </button>
          <button type="submit" class="platform__confirm-button js-confirm-reject"> No </button>
         </div>
        </div>
        `;
        this.parentEl.insertAdjacentHTML("afterbegin", confirmMarkup);
        removeBtn.closest(".js-stats").remove();
        const confirmDeleteCont = document.querySelector(
          ".platform__confirm-markup"
        );

        confirmDeleteCont.addEventListener("click", (e) => {
          if (e.target.classList.contains("js-confirm-accept")) {
            console.log("aa");
          } else if (e.target.classList.contains("js-confirm-reject")) {
            confirmDeleteCont.remove();
          } else return;
        });
      });
    });
  }
}

export default new TaskView();
