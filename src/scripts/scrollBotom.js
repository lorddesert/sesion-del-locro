const scrollBottom = (smooth = false) => {
    const chat = document.getElementById("chat");

    if (smooth && typeof smooth === "boolean") {
      chat.scrollTo({
        top: chat.scrollHeight,
        behavior: "smooth",
      });
    } else {
      chat.scrollTo({
        top: chat.scrollHeight,
      });
    }
  };

  export default scrollBottom