import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import jpIMG from "../../assets/logo.png";
import imagem1 from "../../assets/imagem1.jpg";
import imagem2 from "../../assets/imagem2.jpg";
import imagem3 from "../../assets/imagem3.jpg";

function Principal() {
    const [selected, setSelected] = useState(null);

    const handleButtonClick = (index) => {
        setSelected(index);
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
                    <Link to="/principal">
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
                    <Link to="/">
                        <button
                            className="logout-button"
                            onClick={() => handleButtonClick(3)}
                        >
                            LogOut
                        </button>
                    </Link>
                </div>
                <img className="logo-img" src={jpIMG} alt="logo" />
            </div>
            <div className="carousel-container">
                <Slider {...settings}>
                    <div>
                        <img src={imagem1} alt="Imagem 1" style={imageStyle} />
                    </div>
                    <div>
                        <img src={imagem2} alt="Imagem 2" style={imageStyle} />
                    </div>
                    <div>
                        <img src={imagem3} alt="Imagem 3" style={imageStyle} />
                    </div>
                </Slider>
            </div>
            <footer className="footer">
                <hr className="mt-5 mb-4" />
                <p className="text-muted">
                    Página que permite visualizar e inscrever em vários eventos desportivos.
                </p>
            </footer>
        </div>
    );
}

export default Principal;
