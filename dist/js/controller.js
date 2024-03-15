import boardsView from "../../dist/js/view/boardsView.js";
import themeView from "./view/themeView.js";
import * as model from "./model.js";
import tasksView from "./view/tasksView.js";
import animationsView from "./view/animationsView.js";

const handleTheme = function () {
  themeView._changeTheme();
};

const handleBoards = function () {
  boardsView._handleBoard(model.boards);
};

const handleTasks = function () {
  tasksView._createTaskForm();
};

const animations = function () {
  animationsView._showBar();
  animationsView._hideBar();
};

handleTheme();
handleBoards();
handleTasks();
animations();
