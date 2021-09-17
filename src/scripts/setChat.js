import scrollBottom from './scrollBottom'

const setChat = async (receiver, contactRef) => {
  try {
    let i = null
    let receiverPhoto = null
    let receiverName = null

    if (window.innerWidth < 768) {
      document.getElementById("main").classList.toggle("show-chat")
    }

    const snapshot = await contactRef.ref.once("value")
    receiverPhoto = snapshot.child("photo").val()
    receiverName = snapshot.child("nickname").val()

    for (i = 0; i < this.state.contacts.length; i++)
      if (state.contacts[i].nickname === receiver)
        setState(
          {
            receiver: contactRef.ref,
            receiverPhoto,
            receiverName,
            receiverNickname: this.state.contacts[i].nickname,
            chat: this.state.contacts[i].chat,
            inChatRoom: false,
          },
          )
          scrollBottom()
  } catch (error) {
    console.log(error)    
  }
}

  export default setChat