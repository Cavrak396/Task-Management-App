import boardsView from "../../dist/js/view/boardsView.js";
import themeView from "./view/themeView.js";
import * as model from "./model.js";

const handleTheme = function () {
  themeView._changeTheme();
};

const handleBoards = function () {
  boardsView._createNewBoard(model.boards);
};

handleTheme();
handleBoards();
