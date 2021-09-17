const toggleModal = (createChatRoom = false) => {
    if (createChatRoom) {
      this.setState(
        () => ({
          showCRModal: true,
          inChatRoom: false,
          receiver: false,
        }),
        () => {
          document.getElementById("modal").classList.toggle("show-modal");
          setTimeout(
            () =>
              document
                .getElementById("modalForm")
                .classList.toggle("modalTransition"),
            100
          );
        }
      );
    } else {
      this.setState(
        () => ({
          showCRModal: true,
        }),
        () => {
          document.getElementById("modal").classList.toggle("show-modal");
          setTimeout(
            () =>
              document
                .getElementById("modalForm")
                .classList.toggle("modalTransition"),
            10
          );
        }
      );
    }
  };

  export default toggleModal