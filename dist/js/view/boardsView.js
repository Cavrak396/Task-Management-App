import View from "./view.js";

class BoardsView extends View {
  boardBtn = document.querySelector(".js-board-btn");
  boardsList = document.querySelector(".js-boards-list");

  _handleBoard(data) {
    this.boardBtn.addEventListener("click", () => {
      this._createCloud();
      this._confirmBoard(data);
      this._discardBoard();
    });
  }

  _createCloud() {
    const cloudMarkup = `
    <div class="platform__confirm-board js-confirm-board">
     <span class="platform__confirm-tag"> Create New Board? </span>
     <form class="platform__confirm-form">
      <input type="text" class="platform__confirm-input js-board-input" placeholder="Board name...">
      <div class="platform__confirm-buttons">
       <button type="submit" class="platform__confirm-button js-confirm-btn"> Create </button>
       <button type="button" class="platform__confirm-button js-discard-btn"> Discard </button>
      </div>
     </form>
    </div>
    `;
    this.parentEl.insertAdjacentHTML("afterbegin", cloudMarkup);
  }

  _confirmBoard(data) {
    const confirmBtn = this.parentEl.querySelector(".js-confirm-btn");
    confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const inputValue = this.parentEl.querySelector(".js-board-input").value;

      const boardMarkup = `
      <li class="platform__boards-item js-boards-item">${inputValue}</li>
      `;

      this.boardsList.insertAdjacentHTML("afterbegin", boardMarkup);
      data.push(boardMarkup);
      confirmBtn.closest(".js-confirm-board").remove();
      this._activateBoard();
    });
  }

  _discardBoard() {
    const discardBtn = this.parentEl.querySelector(".js-discard-btn");
    discardBtn.addEventListener("click", () => {
      discardBtn.closest(".js-confirm-board").remove();
    });
  }

  _activateBoard() {
    const boardsItems = this.parentEl.querySelectorAll(".js-boards-item");
    boardsItems.forEach((boardItem) => {
      boardItem.addEventListener("click", () => {
        boardsItems.forEach((item) => {
          item.classList.remove("activate-board");
        });
        boardItem.classList.add("activate-board");
      });
    });
  }
}

export default new BoardsView();
