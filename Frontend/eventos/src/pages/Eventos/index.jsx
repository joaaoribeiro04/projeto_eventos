import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jpIMG from "../../assets/logo.png";
import axios from 'axios'; 
import "../../components/eventos.css";

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [filtroDesporto, setFiltroDesporto] = useState('');
    const [filtroMes, setFiltroMes] = useState('');
    const [eventosFiltrados, setEventosFiltrados] = useState([]); // Estado para armazenar os eventos filtrados
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 15; // Número máximo de eventos por página

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

    useEffect(() => {
        // Função para filtrar e ordenar os eventos quando o filtro de desporto ou mês é alterado
        const filtrarEventos = () => {
            let eventosFiltradosTemp = eventos.filter(evento => new Date(evento.data) > new Date());

            if (filtroDesporto !== '') {
                eventosFiltradosTemp = eventosFiltradosTemp.filter(evento => evento.desporto === filtroDesporto);
            }

            if (filtroMes !== '') {
                const mesFiltro = parseInt(filtroMes, 10); // Converter o mês para número
                eventosFiltradosTemp = eventosFiltradosTemp.filter(evento => {
                    const eventoMes = new Date(evento.data).getMonth() + 1; // Obter o mês do evento
                    return eventoMes === mesFiltro;
                });
            }

            eventosFiltradosTemp.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1); // Ordena os eventos por título

            setEventosFiltrados(eventosFiltradosTemp);
        };

        filtrarEventos(); // Chama a função inicialmente e sempre que os filtros de desporto ou mês forem alterados
    }, [filtroDesporto, filtroMes, eventos]); // Dependências: filtroDesporto, filtroMes e eventos

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

    const handleFiltroDesportoChange = (e) => {
        setFiltroDesporto(e.target.value);
    };

    const handleFiltroMesChange = (e) => {
        setFiltroMes(e.target.value);
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = eventosFiltrados.slice(indexOfFirstEvent, indexOfLastEvent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
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
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    LogOut
                </button>
            </div>
            <img className="logo-img" src={jpIMG} alt="logo" />
            <div className="filtro-container">
                <select value={filtroDesporto} onChange={handleFiltroDesportoChange}>
                    <option value="">Todos os desportos</option>
                    <option value="Atletismo">Atletismo</option>
                    <option value="BTT">BTT</option>
                    <option value="Caminhada">Caminhada</option>
                    <option value="Trail">Trail</option>
                </select>
                <select value={filtroMes} onChange={handleFiltroMesChange}>
                    <option value="">Todos os meses</option>
                    <option value="1">Janeiro</option>
                    <option value="2">Fevereiro</option>
                    <option value="3">Março</option>
                    <option value="4">Abril</option>
                    <option value="5">Maio</option>
                    <option value="6">Junho</option>
                    <option value="7">Julho</option>
                    <option value="8">Agosto</option>
                    <option value="9">Setembro</option>
                    <option value="10">Outubro</option>
                    <option value="11">Novembro</option>
                    <option value="12">Dezembro</option>
                </select>
            </div>
            <div className="eventos-container">
                {currentEvents.map(evento => (
                    <Link key={evento.id} to={`/visualizacao/${evento.id}`} className="evento-link">
                        <div className="evento-card">
                            <img src={`http://localhost:8000/${evento.imagem}`} alt="Imagem do Evento" />
                            <h2>{evento.titulo}</h2>
                            <p>Cidade: {evento.cidade}</p>
                            <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
                            <p>Desporto: {evento.desporto}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)}>Página anterior</button>
                )}
                {currentEvents.length === eventsPerPage && (
                    <button onClick={() => paginate(currentPage + 1)}>Próxima página</button>
                )}
            </div>
        </div>
    );
}

export default Eventos;
