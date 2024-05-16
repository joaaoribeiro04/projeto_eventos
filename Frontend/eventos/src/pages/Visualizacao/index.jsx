import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import jpIMG from "../../assets/logo.png";
import axios from 'axios';
import "../../components/visualizacao.css";

function Visualizacao() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/logout');
            if (response.status === 200) {
                window.location.href = '/';
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    useEffect(() => {
        async function fetchEvento() {
            try {
                const response = await fetch(`http://localhost:8000/api/Eventos/${id}`);
                if (!response.ok) {
                    throw new Error('Falha ao carregar o evento');
                }
                const data = await response.json();
                setEvento(data);
            } catch (error) {
                console.error('Erro ao buscar evento:', error);
            }
        }

        fetchEvento();
    }, [id]);

    const handleInscricao = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/Eventos/${id}/Inscricao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Inscrição realizada com sucesso!');
            } else {
                console.error('Erro ao fazer inscrição:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer inscrição:', error);
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
            <div className="evento-container">
                {evento && (
                    <div className="evento-card">
                        <img src={evento.imagem} alt="Imagem do Evento" />
                        <div className="evento-info">
                            <h2>{evento.titulo}</h2>
                            <p>Cidade: {evento.cidade}</p>
                            <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
                            <p>Desporto: {evento.desporto}</p>
                            <p>Descrição: {evento.descricao}</p>
                        </div>
                        <button className="inscricao-button" onClick={handleInscricao}>Inscrever</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Visualizacao;
