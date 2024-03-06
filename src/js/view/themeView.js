class ThemeView {
  scroll = document.querySelector(".js-theme-scroll");
  themeChanger = document.querySelector(".js-theme-bar");

  _changeTheme() {
    this.themeChanger.addEventListener("click", () => {
      this.scroll.classList.toggle("moving-theme-scroll");
    });
  }
}

export default new ThemeView();
