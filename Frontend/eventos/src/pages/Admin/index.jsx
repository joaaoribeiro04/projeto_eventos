import React, { useState, useEffect } from "react";
import jpIMG from "../../assets/logo.png";
import axios from 'axios';
import "../../components/historico.css";

function AdminHistorico() {
    const [file, setFile] = useState(null);
    const [uploadedImagePath, setUploadedImagePath] = useState("");
    const [evento, setEvento] = useState({
        titulo: '',
        descricao: '',
        data: '',
        imagem: '',
        cidade: '',
        desporto: ''
    });
    const [eventos, setEventos] = useState([]);
    const [eventoToDeleteId, setEventoToDeleteId] = useState('');
    const [eventoToCheckId, setEventoToCheckId] = useState('');
    const [inscritosCount, setInscritosCount] = useState(null);
    const [insertSuccessMessage, setInsertSuccessMessage] = useState("");
    const [insertErrorMessage, setInsertErrorMessage] = useState("");
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
    const [checkInscritosErrorMessage, setCheckInscritosErrorMessage] = useState("");

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/eventos');
            setEventos(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

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

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/Eventos/UploadImagem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const filePath = response.data.filePath;
            setUploadedImagePath(filePath);
            setEvento({ ...evento, imagem: filePath });
            console.log('File uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEvento({ ...evento, [name]: value });
    };

    const handleEventoSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/eventos', evento);
            setInsertSuccessMessage("Evento criado com sucesso!");
            console.log('Evento created successfully:', response.data);
            fetchEventos(); // Atualiza a lista de eventos após a criação
            setTimeout(() => {
                setInsertSuccessMessage("");
            }, 3000); // Limpar mensagem de sucesso após 3 segundos
        } catch (error) {
            setInsertErrorMessage("Falha ao criar o evento");
            console.error('Error creating evento:', error);
            setTimeout(() => {
                setInsertErrorMessage("");
            }, 3000); // Limpar mensagem de erro após 3 segundos
        }
    };

    const handleDeleteEvento = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/Eventos/${eventoToDeleteId}`);
            if (response.status === 204) {
                setDeleteSuccessMessage("Evento excluído com sucesso!");
                console.log('Evento deleted successfully');
                fetchEventos(); // Atualiza a lista de eventos após a exclusão
                setTimeout(() => {
                    setDeleteSuccessMessage("");
                }, 3000); // Limpar mensagem de sucesso após 3 segundos
            } else {
                setDeleteErrorMessage("Erro ao excluir evento");
                console.error('Erro ao excluir evento');
                setTimeout(() => {
                    setDeleteErrorMessage("");
                }, 3000); // Limpar mensagem de erro após 3 segundos
            }
        } catch (error) {
            setDeleteErrorMessage("Erro ao excluir evento");
            console.error('Erro ao excluir evento:', error);
            setTimeout(() => {
                setDeleteErrorMessage("");
            }, 3000); // Limpar mensagem de erro após 3 segundos
        }
    };

    const handleCheckInscritos = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/Eventos/${eventoToCheckId}/Inscritos`);
            setInscritosCount(response.data);
            setCheckInscritosErrorMessage("");
        } catch (error) {
            setCheckInscritosErrorMessage("Erro ao verificar inscritos");
            console.error('Erro ao verificar inscritos:', error);
            setInscritosCount(null);
        }
    };

    return (
        <div className="container-header">
            <div className="input-container">
                <button>Eventos Desportivos</button>
            </div>
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>LogOut</button>
            </div>
            <img className="logo-img" src={jpIMG} alt="logo" />
            <div className="admin-historico-container">
                <div className="admin-form-container">
                    <h3>Inserir evento</h3>
                    <form className="admin-form" onSubmit={handleFileUpload}>
                        <input className="admin-input" type="file" onChange={handleFileChange} />
                        <button className="admin-button" type="submit">Upload Image</button>
                    </form>
                    {uploadedImagePath && (
                        <div>
                            <p>Imagem carregada:</p>
                            <img src={`http://localhost:8000/${uploadedImagePath}`} alt="Uploaded" style={{ maxWidth: '300px' }} />
                        </div>
                    )}
                    <form className="admin-form" onSubmit={handleEventoSubmit}>
                        <input
                            className="admin-input"
                            type="text"
                            name="titulo"
                            placeholder="Título do Evento"
                            value={evento.titulo}
                            onChange={handleInputChange}
                        />
                        <input
                            className="admin-input"
                            type="text"
                            name="descricao"
                            placeholder="Descrição"
                            value={evento.descricao}
                            onChange={handleInputChange}
                        />
                        <input
                            className="admin-input"
                            type="datetime-local"
                            name="data"
                            placeholder="Data do Evento"
                            value={evento.data}
                            onChange={handleInputChange}
                        />
                        <input
                            className="admin-input"
                            type="text"
                            name="cidade"
                            placeholder="Cidade"
                            value={evento.cidade}
                            onChange={handleInputChange}
                        />
                        <input
                            className="admin-input"
                            type="text"
                            name="desporto"
                            placeholder="Desporto"
                            value={evento.desporto}
                            onChange={handleInputChange}
                        />
                        <button className="admin-button" type="submit">Criar Evento</button>
                        {insertSuccessMessage && <p className="success-message">{insertSuccessMessage}</p>}
                        {insertErrorMessage && <p className="error-message">{insertErrorMessage}</p>}
                    </form>
                </div>
                <div className="admin-form-container">
                    <h3>Excluir evento</h3>
                    <div>
                        <input
                            className="admin-input"
                            type="text"
                            placeholder="ID do evento a excluir"
                            value={eventoToDeleteId}
                            onChange={(e) => setEventoToDeleteId(e.target.value)}
                        />
                        <button className="admin-button" onClick={handleDeleteEvento}>Excluir Evento</button>
                        {deleteSuccessMessage && <p className="success-message">{deleteSuccessMessage}</p>}
                        {deleteErrorMessage && <p className="error-message">{deleteErrorMessage}</p>}
                    </div>
                </div>
                <div className="admin-form-container">
                    <h3>Verificar inscritos</h3>
                    <div>
                        <input
                            className="admin-input"
                            type="text"
                            placeholder="ID do evento a verificar"
                            value={eventoToCheckId}
                            onChange={(e) => setEventoToCheckId(e.target.value)}
                        />
                        <button className="admin-button" onClick={handleCheckInscritos}>Verificar Inscritos</button>
                        {inscritosCount !== null && <p>Número de inscritos: {inscritosCount}</p>}
                        {checkInscritosErrorMessage && <p className="error-message">{checkInscritosErrorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHistorico;
