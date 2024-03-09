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
    taskSubtasks: "",
    taskDescription: "",
  };

  _handleTask() {
    this.createTaskBtn.addEventListener("click", () => {
      this._createTaskForm();
    });
  }

  _createTaskForm() {
    const markup = `
    <div class="platform__task-setup js-task-setup">
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
    this.confirmTaskBtn = this.parentEl.querySelector(".js-confirmTask-btn");
    this.taskSetup = this.parentEl.querySelector(".js-task-setup");
    this.subTaskBtn = this.parentEl.querySelector(".js-subtask-button");
    this.subTaskInput = this.parentEl.querySelector(".js-subtask-input");
    this._confirmTask();
    this._handleSubtask();
  }

  _handleSubtask() {
    this.subTaskBtn.addEventListener("click", () => {
      if (this.subTaskInput.value) {
        const markup = `
        <div class='platform__new-subtasks'>
         <input class="platform__task-input platform__task-input--subtask js-subtask-input" placeholder="e.g Go to walk">
         <button type="button" class="platform__new-subtaskBtn"> Remove </button>
        </div>
        `;

        this.subTaskInput.insertAdjacentHTML("afterend", markup);
      }
    });
  }

  _confirmTask() {
    this.confirmTaskBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const taskName = this.parentEl.querySelector(".js-title-input").value;
      const subtaskName =
        this.parentEl.querySelector(".js-subtask-input").value;
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
      <span class="platform__task-name"> ${taskName}! </span>
      <span class="platform__task-subtask"> ${
        subtaskName ? "You have subtask." : "You haven't subtasks."
      } </span>
      </li>
      `;

      if (taskName) {
        if (selectOption === "todo") {
          taskList.insertAdjacentHTML("afterbegin", markup);
        } else if (selectOption === "doing") {
          taskList.insertAdjacentHTML("afterbegin", markup);
        } else if (selectOption === "done") {
          taskList.insertAdjacentHTML("afterbegin", markup);
        }
      }

      this.taskSetup.remove();
      this.task = this.parentEl.querySelector(".js-task");
      this._changeTaskStatus();
    });
  }

  _changeTaskStatus() {
    this.task.addEventListener("click", () => {
      // Create markup
      const markup = `
      <div class="platform__task-stats js-stats"> 
      <span class="platform__task-statsTag">${this.taskValues.taskName}</span>
      <span class="platform__task-date"> date: ${this._getDate().join(
        "."
      )} </span>
      <ul class="platform__task-subtasks">
      <li class="platform__task-subtask">${this.taskValues.taskSubtasks} </li>
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
        removeBtn.closest(".js-stats").remove();
      });
    });
  }
}

export default new TaskView();
