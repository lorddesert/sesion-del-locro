import { signOut, getAuth } from 'firebase/auth'

export default function Navigation({showConfig, setShowConfig}) {

    const disconnect = async () => {
        await signOut(getAuth())
        alert('Signed out!')
        window.location.reload()
      }

    return <ul className="navigation">
    <li><i onClick={() => setShowConfig(!showConfig)} className="nav-icon config fas fa-cogs"></i></li>
    <li><i onClick={disconnect} className="nav-icon shutdown fas fa-power-off"></i></li>
  </ul>
}