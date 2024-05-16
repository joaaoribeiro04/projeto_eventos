import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jpIMG from "../../assets/logo.png";
import axios from 'axios'; 
import "../../components/eventos.css";

function Eventos() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        async function fetchEventos() {
            try {
                const response = await fetch('http://localhost:8000/api/Eventos');
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        }

        fetchEventos();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout'); // Fazendo a solicitação POST usando Axios
            if (response.status === 200) {
                // Se o logout for bem-sucedido, redireciona para a página inicial ou faz qualquer outra coisa necessária
                window.location.href = '/';
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
                <Link to="/principal">
                    <button>HomePage</button>
                </Link>
                <Link to="/eventos">
                    <button>Eventos</button>
                </Link>
                <Link to="/historico">
                    <button>Histórico</button>
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
            <div className="eventos-container">
                {eventos.map(evento => (
                    <Link key={evento.id} to={`/visualizacao/${evento.id}`} className="evento-link">
                        <div className="evento-card">
                            <img src={evento.imagem} alt="Imagem do Evento" />
                            <h2>{evento.titulo}</h2>
                            <p>Cidade: {evento.cidade}</p>
                            <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
                            <p>Desporto: {evento.desporto}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Eventos;
