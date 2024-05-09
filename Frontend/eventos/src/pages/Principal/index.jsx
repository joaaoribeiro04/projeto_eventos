import { Link } from 'react-router-dom';
import { useState } from "react";
import jpIMG from "../../assets/logo.png";

function Principal() {
    const [selected, setSelected] = useState(null);

    const handleButtonClick = (index) => {
        setSelected(index);
    };

    return (
        <div className="container-header">
            <div className="input-container">
                <Link to="/principal">
                    <button
                        className={selected === 0 ? "selected-button" : ""}
                        onClick={() => handleButtonClick(0)}
                    >
                        HomePage
                    </button>
                </Link>
                <Link to="/eventos">
                    <button
                        className={selected === 1 ? "selected-button" : ""}
                        onClick={() => handleButtonClick(1)}
                    >
                        Eventos
                    </button>
                </Link>
                <Link to="/historico">
                    <button
                        className={selected === 2 ? "selected-button" : ""}
                        onClick={() => handleButtonClick(2)}
                    >
                        Histórico
                    </button>
                </Link>
            </div>
            <div className="logout-container">
                <Link to="/">
                    <button
                        className="logout-button"
                        onClick={() => handleButtonClick(3)}
                    >
                        LogOut
                    </button>
                </Link>
            </div>
            <img className="logo-img" src={jpIMG} alt="logo" />
        </div>
    );
}

export default Principal;
