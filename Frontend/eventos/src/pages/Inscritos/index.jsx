import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jpIMG from "../../assets/logo.png";

function EventosInscritosPage() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        async function fetchEventosInscritos() {
            try {
                const response = await axios.get('http://localhost:8000/api/Eventos/Inscricoes');
                setEventos(response.data);
            } catch (error) {
                console.error('Erro ao buscar eventos inscritos:', error);
            }
        }

        fetchEventosInscritos();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout');
            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div className="container">
            <div className="container-header">
                <div className="input-container">
                    <Link to="/">
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
                    <button className="logout-button" onClick={handleLogout}>
                        LogOut
                    </button>
                </div>
                <img className="logo-img" src={jpIMG} alt="logo" />
            </div>
            <div className="eventos-container">
            <div className="eventos-container">
                    {eventos.map(evento => (
                        <Link key={evento.id} to={`/visualizacao/${evento.id}`} className="evento-link">
                            <li className="evento-card">
                                <img src={`http://localhost:8000/${evento.imagem}`} alt="Imagem do Evento" />
                                <h2>{evento.titulo}</h2>
                                <p>Cidade: {evento.cidade}</p>
                                <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
                                <p>Desporto: {evento.desporto}</p>
                            </li>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventosInscritosPage;
