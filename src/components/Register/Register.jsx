import React, { Component } from "react";
import "./Register.scss";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import toastr from "toastr";

class Register extends Component {
  state = {
    img:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAYFBMVEVmZmb///9VVVVeXl5iYmJaWlpcXFzR0dFWVlZwcHD8/PysrKzf39/GxsZsbGzt7e2Ojo719fXn5+d+fn6VlZWlpaWEhITAwMDU1NS4uLjc3NyLi4udnZ1vb293d3fLy8uj0/C3AAAEW0lEQVR4nO2b2XriMAyFwUvIAgFCWAItff+3HJjIIWUoYwcXLHP+yzbhkyL7yLbk0QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAv4aSidbihNaJVK+2xjdSy3q7q5bjE8tqt61Pf3i1Tf5Qumyq8RVVU+o44qhEPb32rmVaiwhcTBfz2+6dmS/SV9v3ILL8IXpdFEvWc1Gs77t3Zi1ebeVw9KTnSD4pFpkUQmaLYpL3/jHRr7ZzIEr1Zt9sI7rsd8qIYjPrzUTFUmuUWnbBK3Ry5YNKdNGFccnSw4t/W3lTSKTcXjx8tnWPo834XK5+nGN6ZYI4ZzcPhdGX6fXg7KO0ySITZloq15aGdx9izSsfltaB6Twsn2GXL1IaeVOLgSfMs4xWbWpB+pLYPJ2Q3C74SKkgBV1ZmaxWpKRsdEbVlP8stV9TPqy5hJC0P7fWRdmmwz2XZEgSWtg7WLASUtm05jrEQ7dvNDxyoW7PX2ZWEtqStHuLiscYlW04Ng6SoTbtOywiSBqaO4m+yPnoKG2CJg4j9DRGJ7Sx+i2rPJLsHDX0DOnozumrvAjSGLeFFy3uWKiMbpeWmdtbWbt45eCgGCSIJL0clqNikKnD3noJ7+JgvEM0epGJPk1En+ijX6pFv9iOfrv0Bhve2I8soj90GnxsOOUxQt/g4Df6o/uu+JJbhVBTmZdR8SX68ln8BdD4S9i9JoR7TZN8mxB6bSR5nG0k8TcCxd/KFX0z3ij6dspR/A2xFi3Ne94tzSOVJvt7/k0z1o33SizuundmvmZ7RUSJ+s6Nggt5kbKMol79c9vlRxc/+AmNSr6+O1HNisWxPF/OKo+HYnalPVXGbJzqQz/TLbcbreXlyplSUqer7/eZClZBFNue6bOVuHWd7uRk2fQ+w5TPnTuVXAZgXsg7Tdsy7elQnjHxUJXdKnvcpP+ZWyepvTy9YTERVdYZvFcWFqu06V6oGZTPev7VlsdIyWc3TuvgY6jMcdN4PrKeUirtcsohdA+lmVFfTrKfdtuOY9hKYw45x41jWktqo6VBh9BUGcaF8ymu3Jh8GHDGV4cuO7i/LE0M3doXnkqSD5l/3dtmHjq22DwPTVpYDRxk6YPv/zamk2A8WAdN2e0jTCU15j1QBvskJQ2y0GTqupMHrEuagHXGBPAh29J2nWBXOX0upqr72Mc3w2Ad3izUey/Th8ZBgPV65+aY25gQ2vUvPBFTCnt48qTtYmEWmsyQOrg0qN2GGsHcmhWfwNHfZqf9JZdmxSdA333p4btT2T6wxjwqsfiwir5VYI1rdJfg4GFcmc6uoBz0alQaYKJQHx6HFS0ZglrMUBb0k7zkLLxMSLcC/GwCVIB3KEja/TRE0slOUB3qdF/p6OfX2kVDUPeYaAHpqSOS1u0hbev93v4L8C5h9A6OxF/C/DUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg7fgDyhYmCCEbhAQAAAAASUVORK5CYII=",
  };

  getRegisterImg = (e) => {
    e.persist();
    e.preventDefault();

    const img = document.getElementById("fileInput").files[0];
    const imgURL = URL.createObjectURL(img);
    this.setState({ img: imgURL });
  };

  handleEvent = (e) => {
    e.persist();
    e.preventDefault();

    if (!this.props.stepTwo) {
      this.props.beginRegister();
    } else {
      this.props.endRegister();
    }

    // this.props.register();
  };

  render() {
    const { displayName, email } = this.props.user;
    if (!this.props.stepTwo) {
      return (
        <div className="Register">
          <main>
            <form className="registerForm">
              <label htmlFor="email">
                <h2>Email</h2>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  onFocus={this.props.handleInputFocus}
                  onBlur={this.props.handleInputFocus}
                  defaultValue={email ? email : ""}
                  placeholder="example@hotmail.com"
                />
              </label>

              <label htmlFor="nickname">
                <h2>Nickname</h2>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  required
                  onFocus={this.props.handleInputFocus}
                  onBlur={this.props.handleInputFocus}
                  defaultValue={email ? email : ""}
                  placeholder="zawarudo123"
                />
              </label>

              <label htmlFor="password">
                <h2>Contraseña</h2>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onFocus={this.props.handleInputFocus}
                  onBlur={this.props.handleInputFocus}
                />
              </label>
  
              <PrimaryButton value="Continuar" action={this.handleEvent} />
              <p>
                <strong>ó</strong>
              </p>
              <SecondaryButton
                id="logIn"
                value="Inicia Sesión"
                action={this.props.toggleShowRegister}
              />
            </form>
          </main>
        </div>
      );
    } else {
      return (
        <div className="Register">
          <main>
            <form className="registerForm">
              <div style={{ display: "flex", placeItems: "center" }}>
                <img src={this.state.img} alt="imagen del usuario" />
                <PrimaryButton
                  action={(e) => {
                    e.persist();
                    e.preventDefault();
                    document.getElementById("fileInput").click();
                  }}
                  value="Cambiar imagen"
                  className="changeImgBtn"
                />
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={this.getRegisterImg}
                />
              </div>
              <label htmlFor="nickname">Nickname</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                required
                onFocus={this.props.handleInputFocus}
                onBlur={this.props.handleInputFocus}
                defaultValue={displayName ? displayName : ""}
              />
              <PrimaryButton value="Listo" action={this.handleEvent} />
            </form>
          </main>
        </div>
      );
    }
  }
  // render() {
  //   if(!this.state.stepTwo)
  //     return (
  //       <div className='Register'>
  //         <h2>Registro</h2>
  //         <form className='registerForm'>
  //           <input type="text" placeholder='Nombre de usuario'/>
  //           <input type="text" placeholder='Contraseña'/>
  //           <PrimaryButton value='CONTINUAR' action={e => {
  //           e.preventDefault();
  //           this.setState({stepTwo: true});
  //         }}/>
  //         </form>
  //         <div className='stepBalls stepOne'>
  //           <div id='ball1'></div>
  //           <div id='ball2'></div>
  //         </div>
  //       </div>
  //     )
  //   else
  //     return (
  //     <div className='Register'>
  //       <h2>Unos ultimos ajustes</h2>
  //       <form className='registerForm'>
  //         <input type="text" placeholder='Nickname'/>
  //         <div className='imageContainer'>
  //           <div id='userImage'></div>
  //           <SecondaryButton value='Elegir foto' />
  //         </div>
  //         <PrimaryButton value='CONTINUAR' action={() => alert('asdasd')}/>
  //       </form>
  //       <div className='stepBalls stepTwo'>
  //         <div id='ball1'></div>
  //         <div id='ball2'></div>
  //       </div>
  //     </div>
  //   )
}

export default Register;
