import React from "react";

import Modal from "../Modal/Modal";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

import "./CreateCRModal.scss";

const CreateCRModal = (props) => {
  if (props.inChatRoom) {
    return (
      <Modal closeModal={props.toggleModal}>
        <h2>Nombre de la sala</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomName"
          name="chatRoom"
          required
          onFocus={props.handleInputFocus}
          onBlur={props.handleInputFocus}
        />
        <h2>Mensaje de estado</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomState"
          name="chatRoom"
          required
          onFocus={props.handleInputFocus}
          onBlur={props.handleInputFocus}
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
          <SecondaryButton value="Cancelar" action={props.toggleModal} />
          <PrimaryButton value="Guardar" action={props.modifyChatRoom} />
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal closeModal={props.toggleModal}>
        <h2>Nombre de la sala</h2>
        <label htmlFor="chatRoom"></label>
        <input
          type="text"
          id="chatRoomName"
          name="chatRoom"
          required
          onFocus={props.handleInputFocus}
          onBlur={props.handleInputFocus}
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
          <SecondaryButton value="Cancelar" action={props.toggleModal} />
          <PrimaryButton value="Crear" action={props.createNewChatRoom} />
        </div>
      </Modal>
    );
  }
};

export default CreateCRModal;
