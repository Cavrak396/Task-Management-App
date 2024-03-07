import View from "./view.js";

class TaskView extends View {
  createTaskBtn = this.parentEl.querySelector(".js-new-task");

  _handleTask() {
    this.createTaskBtn.addEventListener("click", () => {
      this._createCloud();
    });
  }

  _createCloud() {
    const markup = `
    <div class="platform__task-setup">
    <span class="platform__task-tag"> Add New Task </span>
     <form class="platform__task-form">
     <label for="title" class="platform__task-label"> Title </label>
     <input type="text" class="platform__task-input" id="title" name="title" placeholder="e.g Take coffe break">
     <label for="description" class="platform__task-label"> Description </label>
     <input type="text" class="platform__task-input platform__task-description" id="description" name="description" placeholder="e.g It's always goot to take a break. This is 15 minute to break.">
     <div>
     <label for="subtask" class="platform__task-label"> Subtasks </label>
     <input type="text" class="platform__task-input" id="subtask" name="subtask" placeholder="e.g Make coffe">
     <button type="button" class="platform__subtask-button">+Add New Subtask</button>
     </div>
     <label for="status" class="platform__task-label"> Status </label>
     <select class="platform__task-chooser" id="status" name="status" >
      <option class="platform__task-option">Todo</option>
      <option class="platform__task-option">Doing</option>
      <option class="platform__task-option">Done</option>
     </select>
     <button type="submit" class="platform__newTask-button"> Create Task </button>
     </form>
    </div>
    `;
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new TaskView();
