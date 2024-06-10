import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import jpIMG from "../../assets/logo.png";
import axios from 'axios';
import "../../components/visualizacao.css"; // Certifique-se de que o caminho está correto

function Visualizacao() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [erroInscricao, setErroInscricao] = useState(""); // Estado para armazenar mensagem de erro de inscrição
    const [sucessoInscricao, setSucessoInscricao] = useState(""); // Estado para armazenar mensagem de sucesso de inscrição

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

    useEffect(() => {
        async function fetchEvento() {
            try {
                const response = await axios.get(`http://localhost:8000/api/Eventos/${id}`);
                setEvento(response.data);
            } catch (error) {
                console.error('Erro ao procurar evento:', error);
            }
        }

        fetchEvento();
    }, [id]);

    const handleInscricao = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/Eventos/${id}/Inscricao`);
            console.log('Inscrição realizada com sucesso!');
            setSucessoInscricao("Inscrição realizada com sucesso!");
            setErroInscricao(""); // Limpa a mensagem de erro, se houver
        } catch (error) {
            console.error('Erro ao fazer inscrição:', error);
            if (error.response && error.response.status === 401) {
                setErroInscricao("Inscrição efetuada sem sucesso! É necessário login");
            } else {
                setErroInscricao("Já está inscrito neste evento!");
            }
            setSucessoInscricao(""); // Limpa a mensagem de sucesso
        }
    };

    return (
        <div className="visualizacao-container-header">
            <div className="visualizacao-input-container">
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
            <div className="visualizacao-logout-container">
                <button
                    className="visualizacao-logout-button"
                    onClick={handleLogout}
                >
                    LogOut
                </button>
            </div>
            <img className="visualizacao-logo-img" src={jpIMG} alt="logo" />
            <div className="visualizacao-evento-container">
                {evento && (
                    <div className="visualizacao-evento-card">
                        <img className="visualizacao-evento-imagem" src={`http://localhost:8000/${evento.imagem}`} alt="Imagem do Evento" />
                        <div className="visualizacao-evento-info">
                            <h2>{evento.titulo}</h2>
                            <p><span>Cidade:</span> {evento.cidade}</p>
                            <p><span>Data:</span> {new Date(evento.data).toLocaleDateString()}</p>
                            <p><span>Desporto:</span> {evento.desporto}</p>
                            <p><span>Descrição:</span> {evento.descricao}</p>
                            <button className="visualizacao-inscricao-button" onClick={handleInscricao}>Inscrever</button>
                            {erroInscricao && <p className="visualizacao-erro-inscricao">{erroInscricao}</p>}
                            {sucessoInscricao && <p className="visualizacao-sucesso-inscricao">{sucessoInscricao}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Visualizacao;
