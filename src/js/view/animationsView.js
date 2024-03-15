import View from "./view.js";

class AnimationsView extends View {
  sideBar = this.parentEl.querySelector(".js-platform-boards");
  showBtn = this.parentEl.querySelector(".js-show-btn");
  hideBtn = this.parentEl.querySelector(".js-hide-btn");

  _showBar() {
    this.showBtn.addEventListener("click", () => {
      this.sideBar.classList.add("activate-sidebar");
    });
  }

  _hideBar() {
    this.hideBtn.addEventListener("click", () => {
      this.sideBar.classList.remove("activate-sidebar");
    });
  }
}

export default new AnimationsView();
