class ThemeView {
  scroll = document.querySelector(".js-theme-scroll");
  themeChanger = document.querySelector(".js-theme-bar");
  platformHeader = document.querySelector(".js-header");
  platformBoards = document.querySelector(".js-platform-boards");
  taskPanel = document.querySelector(".js-task-panel");

  isDarkTheme = false;

  _toggleTheme() {
    if (this.isDarkTheme) {
      this.platformBoards.style.backgroundColor = "#302c3c";
      this.platformHeader.style.backgroundColor = "#302c3c";
      this.taskPanel.style.backgroundColor = "#28242c";
    } else {
      this.platformBoards.style.backgroundColor = "#303c48";
      this.platformHeader.style.backgroundColor = "#303c48";
      this.taskPanel.style.backgroundColor = "#F0F0F0";
    }
    this.isDarkTheme = !this.isDarkTheme;
  }

  _changeTheme() {
    this.themeChanger.addEventListener("click", () => {
      this.scroll.classList.toggle("moving-theme-scroll");
      this._toggleTheme();
    });
  }
}

export default new ThemeView();
