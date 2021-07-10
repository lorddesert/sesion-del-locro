const handleInputFocus = (e) => {
    e.persist();
    e.preventDefault();
    e.target.classList.toggle("focusedInput");
  };

  export default handleInputFocus