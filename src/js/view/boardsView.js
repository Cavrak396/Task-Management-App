import View from "./view.js";

class BoardsView extends View {
  boardBtn = document.querySelector(".js-board-btn");
  boardsList = document.querySelector(".js-boards-list");
  panelHolder = document.querySelector(".js-panel-holder");
  mainBoard = document.querySelector(".js-main-board");
  mainBoardItem = document.querySelector(".js-mainBoard-item");
  platformTitle = document.querySelector(".js-platform-title");
  panel;
  deleteBtn;

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
      const formattedValue = inputValue.split(" ").join("-");
      const boardMarkup = `<li class="platform__boards-item js-boards-item">
        <button type="button" class="platform__boards-button js-boards-buttonTag">${formattedValue}</button>
        <button type="button" class="platform__boards-clear js-deleteBoard"> <img src="././images/close.png" class="platform__boards-close" alt="close image"></button>
      </li>`;

      this.boardsList.insertAdjacentHTML("afterbegin", boardMarkup);

      const newBoarditem = document.querySelector(".js-boards-item");

      document.querySelectorAll(".js-boards-item").forEach((item) => {
        item.classList.remove("activate-board");
      });

      newBoarditem.classList.add("activate-board");
      this.platformTitle.textContent = formattedValue;
      data.push(boardMarkup); // for local storage!
      this.mainBoard.style.display = "none";
      confirmBtn.closest(".js-confirm-board").remove();
      this._activateBoard();
      this._createUserPanel(formattedValue);
      this._deleteBoard();
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
        this.panelHolder.querySelectorAll(".js-task-panel").forEach((panel) => {
          panel.style.display = "none";
        });
        const panelName = boardItem.textContent.trim();
        const panel = this.panelHolder.querySelector(
          `.platform__panel-${panelName}`
        );
        this.platformTitle.textContent = panelName;

        if (panel) panel.style.display = "block";
      });
    });
  }

  _deleteBoard() {
    this.deleteBtn = document.querySelectorAll(".js-deleteBoard");
    this.deleteBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        // Markup
        const markup = `
      <div class="panel__delete-confirm">
       <span class="panel__delete-title"> Are you sure? </span>
       <div class="panel__delete-buttons">
       <button type="button" class="panel__delete-btn js-delete-yes"> Yes </button>
       <button type="button" class="panel__delete-btn js-delete-no"> No </button>
       </div>
      </div>
      `;
        this.parentEl.insertAdjacentHTML("afterbegin", markup);

        const acceptBtn = this.parentEl.querySelector(".js-delete-yes");

        acceptBtn.addEventListener("click", () => {
          const boardItem = deleteBtn.closest(".js-boards-item");
          const boardBtn = boardItem.querySelector(
            ".js-boards-buttonTag"
          ).textContent;
          const panel = this.panelHolder.querySelector(
            `.platform__panel-${boardBtn}`
          );
          boardItem.remove();
          panel.remove();
          this._panelMessage();
          acceptBtn.closest(".panel__delete-confirm").remove();
        });
      });
    });
  }

  _discardBoard() {
    const discardBtn = this.parentEl.querySelector(".js-discard-btn");
    discardBtn.addEventListener("click", () => {
      discardBtn.closest(".js-confirm-board").remove();
    });
  }

  _panelMessage() {
    const markup = `
    <div class="platform__message-holder"> 
    <p class="platform__message"> There is no any tasks, please select board! :) </p>
    </div>
    `;

    this.platformTitle.textContent = "Oopss, select board! :)";
    this.panelHolder.insertAdjacentHTML("afterbegin", markup);
  }

  _createUserPanel(name) {
    const markup = `
    <div class="platform__task-panel js-task-panel platform__panel-${name}">
     <div class="platform__task-line">
         <div class="platform__task-holder">
             <span class="platform__task-tag">
                 <span class="platform__task-status platform__task-status--todo"></span>
                  <span class="platform__task-plan">TODO</span>
                     </span>
             <ul class="platform__task-list js-todo"></ul>
         </div>
         <div class="platform__task-holder">
             <span class="platform__task-tag">
                 <span class="platform__task-status platform__task-status--doing"></span>
                 <span class="platform__task-plan">DOING</span>
             </span>
             <ul class="platform__task-list js-doing"></ul>
         </div>
          <div class="platform__task-holder">
             <span class="platform__task-tag">
                 <span class="platform__task-status platform__task-status--done"></span>
                 <span class="platform__task-plan">DONE</span>
             </span>
             <ul class="platform__task-list js-done"></ul>
         </div>        
        </div>
     </div>
    `;

    this.panelHolder.insertAdjacentHTML("afterbegin", markup);
    this.panel = this.panelHolder.querySelector(`.platform__panel-${name}`);
  }
}

export default new BoardsView();
