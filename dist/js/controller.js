import boardsView from "../../dist/js/view/boardsView.js";
import themeView from "./view/themeView.js";
import * as model from "./model.js";
import tasksView from "./view/tasksView.js";

const handleTheme = function () {
  themeView._changeTheme();
};

const handleBoards = function () {
  boardsView._handleBoard(model.boards);
};

const handleTasks = function () {
  tasksView._handleTask();
};

handleTheme();
handleBoards();
handleTasks();
