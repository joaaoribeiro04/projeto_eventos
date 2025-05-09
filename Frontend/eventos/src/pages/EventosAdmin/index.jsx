import React, { useState, useEffect } from "react";
import jpIMG from "../../assets/logo.png";
import axios from 'axios';
import { AiFillCloseCircle, AiOutlineEdit } from 'react-icons/ai';  // Ícones de cruz e caneta
import "../../components/historico.css";

function EventosAdmin() {
    const [eventoToDeleteId, setEventoToDeleteId] = useState('');
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
    const [currentEvents, setCurrentEvents] = useState([]);  // Estado para armazenar os eventos
    const [isEditing, setIsEditing] = useState(null);  // Para controlar o evento sendo editado
    const [editedEvento, setEditedEvento] = useState({});  // Estado para armazenar os dados editados

    // Logout
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

    // Excluir Evento com confirmação
    const handleDeleteEvento = async (id) => {
        const isConfirmed = window.confirm("Você tem certeza que deseja excluir este evento?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/Eventos/${id}`);
                if (response.status === 204) {
                    setDeleteSuccessMessage("Evento excluído com sucesso!");
                    setTimeout(() => setDeleteSuccessMessage(""), 3000); // Limpar após 3 segundos
                    // Atualiza a lista de eventos após a exclusão
                    setCurrentEvents(currentEvents.filter(evento => evento.id !== id));
                } else {
                    setDeleteErrorMessage("Erro ao excluir evento");
                    setTimeout(() => setDeleteErrorMessage(""), 3000); // Limpar após 3 segundos
                }
            } catch (error) {
                setDeleteErrorMessage("Erro ao excluir evento");
                console.error('Erro ao excluir evento:', error);
                setTimeout(() => setDeleteErrorMessage(""), 3000); // Limpar após 3 segundos
            }
        }
    };

    // Função para editar o evento
    const handleEditEvento = (evento) => {
        setIsEditing(evento.id);
        setEditedEvento({ ...evento });  // Carrega os dados do evento para edição
    };

    // Função para salvar as edições
    const handleSaveEdit = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/Eventos/${id}`, editedEvento);
            if (response.status === 200) {
                setCurrentEvents(currentEvents.map(evento => evento.id === id ? response.data : evento));
                setIsEditing(null);  // Finaliza a edição
                setDeleteSuccessMessage("Evento atualizado com sucesso!");
                setTimeout(() => setDeleteSuccessMessage(""), 3000); // Limpar após 3 segundos
            }
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            setDeleteErrorMessage("Erro ao atualizar evento");
            setTimeout(() => setDeleteErrorMessage(""), 3000); // Limpar após 3 segundos
        }
    };

    // Buscar eventos
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/eventos');
                setCurrentEvents(response.data);  // Atualizar estado com os eventos
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        };
        fetchEventos();
    }, []);

    const handlePaginaAnterior = () => {
        window.location.href = '/admin';  // Use o caminho da página que você deseja redirecionar
    };

    // Função para atualizar os campos editados
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvento(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container-header">
            <div className="input-container">
                <button onClick={handlePaginaAnterior}>Página anterior</button>
            </div>
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>LogOut</button>
            </div>
            <img className="logo-img" src={jpIMG} alt="logo" />

            {/* Exibição dos eventos com ícone de exclusão */}
            <div className="eventos-container">
                {currentEvents.map(evento => (
                    <div key={evento.id} className="evento-card">
                        <img src={`http://localhost:8000/${evento.imagem}`} alt="Imagem do Evento" />
                        
                        {/* Editando campos do evento */}
                        {isEditing === evento.id ? (
                            <>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={editedEvento.titulo}
                                    onChange={handleInputChange}
                                    placeholder="Título"
                                />
                                <input
                                    type="text"
                                    name="cidade"
                                    value={editedEvento.cidade}
                                    onChange={handleInputChange}
                                    placeholder="Cidade"
                                />
                                <input
                                    type="date"
                                    name="data"
                                    value={new Date(editedEvento.data).toISOString().split("T")[0]}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="desporto"
                                    value={editedEvento.desporto}
                                    onChange={handleInputChange}
                                    placeholder="Desporto"
                                />
                                <button onClick={() => handleSaveEdit(evento.id)}>Salvar</button>
                            </>
                        ) : (
                            <>
                                <h2>{evento.titulo}</h2>
                                <p>Cidade: {evento.cidade}</p>
                                <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
                                <p>Desporto: {evento.desporto}</p>
                                <p><strong>ID do Evento: </strong>{evento.id}</p>
                            </>
                        )}
                        
                        {/* Ícones de edição e exclusão */}
                        {isEditing !== evento.id && (
                            <AiOutlineEdit
                                className="edit-icon"
                                onClick={() => handleEditEvento(evento)}
                                style={{cursor: 'pointer', color: 'blue'}}
                            />
                        )}
                        <AiFillCloseCircle 
                            className="delete-icon" 
                            onClick={() => handleDeleteEvento(evento.id)} 
                            style={{cursor: 'pointer', color: 'red'}}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventosAdmin;
