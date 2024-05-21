import { Link } from 'react-router-dom';
import { useState } from "react";
import jpIMG from "../../assets/logo.png";
import axios from 'axios'; 

function Historico() {
    const [selected, setSelected] = useState(null);

    const handleButtonClick = (index) => {
        setSelected(index);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout'); // Fazendo a solicitação POST usando Axios
            if (response.status === 200) {
                // Se o logout for bem-sucedido, redireciona para a página inicial ou faz qualquer outra coisa necessária
                window.location.href = '/login';
            } else {
                // Tratar erro de logout, se necessário
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div className="container-header">
            <div className="input-container">
                <Link to="/">
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
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        LogOut
                    </button>
                </div>
            <img className="logo-img" src={jpIMG} alt="logo" />
        </div>
    );
}

export default Historico;
