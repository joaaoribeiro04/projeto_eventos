import { useState } from "react";
import jpIMG from "../../assets/logo.png";
import axios from 'axios';

function Historico() {
    const [file, setFile] = useState(null);
    const [uploadedImagePath, setUploadedImagePath] = useState("");
    const [evento, setEvento] = useState({
        nome: '',
        descricao: '',
        data: '',
        imagem: ''
    });

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
            console.log('Evento created successfully:', response.data);
        } catch (error) {
            console.error('Error creating evento:', error);
        }
    };

    return (
        <div className="container-header">
            <div className="input-container">
                <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload Image</button>
                </form>
                {uploadedImagePath && (
                    <div>
                        <p>Imagem carregada:</p>
                        <img src={`http://localhost:8000/${uploadedImagePath}`} alt="Uploaded" style={{ maxWidth: '300px' }} />
                    </div>
                )}
                <form onSubmit={handleEventoSubmit}>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do Evento"
                        value={evento.nome}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição"
                        value={evento.descricao}
                        onChange={handleInputChange}
                    />
                    <input
                        type="datetime-local"
                        name="data"
                        placeholder="Data do Evento"
                        value={evento.data}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Criar Evento</button>
                </form>
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
