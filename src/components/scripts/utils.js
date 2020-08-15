export function doAfter100MS (f) {
  setTimeout(() => f, 100);
}

sendMsg2 = () => {
  /*



// First we receive the ref of the contact,
  // Second we create a new ref pointing to the contact ref,
  // Choose the new info and set it in the ref we create.
  // This will work...?

  const ref = this.app.database().ref(contactRef.ref);
  const newContact = {
    ...contactRef.val(),
  }

  console.log(contactRef.ref);
  ref.set(newContact);

*/

// receiver = reference, of the refence of the contact
    // console.log(receiver.path.pieces_[1]); // this will return the contact ID

    // This is sending the MSG to -> lorddesert/contacts/chat/lorddesert <- i need to change this to the receiver
    // Now YES!

    // 1) Send msg to my chat.
    // 2) Send msg to the receiver chat.


    receiver.child(`contacts/${sender}/chat`).push().set(newMsg);
}