class BoardsView {
  boardBtn = document.querySelector(".js-board-btn");
  boardsList = document.querySelector(".js-boards-list");

  _createNewBoard(data) {
    this.boardBtn.addEventListener("click", () => {
      const markup = `
        <li class="platform__boards-item">Board</li>
      `;

      this.boardsList.insertAdjacentHTML("beforeend", markup);
    });
  }
}

export default new BoardsView();
