import React, { useCallback, useContext } from "react";
import GlobalContext from '../../context/GlobalContext'
import handleInputFocus from '../../scripts/handleInputFocus'

import Modal from "../Modal/Modal";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

import "./CreateCRModal.scss";

const CreateCRModal = (props) => {
const { globalContext } = useContext(GlobalContext)

const { app } = globalContext

const toggleModal = useCallback((createChatRoom = false) => {
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
}, [])

const createNewChatRoom = useCallback((e) => {
  e.persist();
  e.preventDefault();

  const ref = app.database().ref("chatRooms");
  const minDiceValue = document.getElementById("minValue").value;
  const maxDiceValue = document.getElementById("maxValue").value;
  const name = document.getElementById("chatRoomName").value;
  const newChatRoom = {
    // photo,
    chat: [],
    name,
    minDiceValue,
    maxDiceValue,
    stateMsg: "",
  };

  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.child(`${name}`).exists()) {
        alert("El nombre de la sala no esta disponible.");
        return false;
      } else
        ref
          .child(`${name}`)
          .set(newChatRoom)
          .then(() => {
            toggleModal();
          });
    })
    .catch((err) => console.log(err));
}, []);


  if (props.inChatRoom) {
    return (
      <Modal closeModal={toggleModal}>
        <h2>Nombre de la sala</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomName"
          name="chatRoom"
          required
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
        />
        <h2>Mensaje de estado</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomState"
          name="chatRoom"
          required
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
        />
        <label htmlFor="diceFaces"></label>
        <h2>Caras del dado</h2>
        <div className="diceValues">
          <h3>Min</h3>
          <label htmlFor="minValue"></label>
          <input type="number" id="minValue" />
          <h3>Max</h3>
          <label htmlFor="maxValue"></label>
          <input type="number" id="maxValue" />
        </div>
        <div style={{ display: "flex", placeItems: "center" }}>
          <SecondaryButton value="Cancelar" action={toggleModal} />
          <PrimaryButton value="Guardar" action={modifyChatRoom} />
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal closeModal={toggleModal}>
        <h2>Nombre de la sala</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomName"
          name="chatRoom"
          required
          onFocus={handleInputFocus}
          onBlur={handleInputFocus}
        />
        <label htmlFor="diceFaces"></label>
        <h2>Caras del dado</h2>
        <div className="diceValues">
          <h3>Min</h3>
          <label htmlFor="minValue"></label>
          <input type="number" id="minValue" />
          <h3>Max</h3>
          <label htmlFor="maxValue"></label>
          <input type="number" id="maxValue" />
        </div>
        <div style={{ display: "flex", placeItems: "center" }}>
          <SecondaryButton value="Cancelar" action={toggleModal} />
          <PrimaryButton value="Crear" action={createNewChatRoom} />
        </div>
      </Modal>
    );
  }
};

export default CreateCRModal;
