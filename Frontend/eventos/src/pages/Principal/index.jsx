import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jpIMG from "../../assets/logo.png";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function EventList() {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        async function fetchEventos() {
            try {
                const response = await axios.get('http://localhost:8000/api/Eventos/Inscricoes');
                setEventos(response.data);
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        }

        fetchEventos();
    }, []);

    return (
        <div className="eventos-container">
            <h2>Lista de Eventos</h2>
            <ul>
                {eventos.map(evento => (
                    <li key={evento.id}>
                        <Link to={`/visualizacao/${evento.id}`}>{evento.titulo}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Principal() {
    const [selected, setSelected] = useState(null);
    const [showList, setShowList] = useState(false);

    const handleButtonClick = (index) => {
        setSelected(index);
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

    const handleShowList = () => {
        setShowList(!showList); // Alternar entre mostrar e ocultar a lista
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        draggable: true
    };

    const imageStyle = {
        width: '100%',
        height: '600px',
        objectFit: 'cover',
        imageRendering: '-webkit-optimize-contrast',
        margin: '0 auto',
        userSelect: 'none',
        border: '20px solid #333'
    };

    return (
        <div className="container">
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
                <Link to="/inscritos"> {/* Aqui está a adição para navegar para a página de eventos inscritos */}
                    <button
                        className="eventosinscritos-button"
                        style={{ float: 'right' }}
                    >
                        Eventos Inscritos
                    </button>
                </Link>
            </div>
            <div className="carousel-container">
                <Slider {...settings}>
                    <div>
                        <img src={require("../../assets/imagem2.jpg")} alt="Imagem 2" style={imageStyle} />
                    </div>
                    <div>
                        <img src={require("../../assets/imagem1.jpg")} alt="Imagem1 " style={imageStyle} />
                    </div>
                    <div>
                        <img src={require("../../assets/imagem3.jpg")} alt="Imagem 3" style={imageStyle} />
                    </div>
                </Slider>
            </div>
            {showList && <EventList />}
            <footer className="footer">
                <hr className="mt-5 mb-4" />
                <p className="text-muted">
                    Website para a gestão de eventos desportivos.
                </p>
            </footer>
        </div>
    );
}

export default Principal;
