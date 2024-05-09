import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import jpIMG from "../../assets/logo.png";
import { motion } from 'framer-motion';

function Principal() {
    const [selected, setSelected] = useState(null);

    const handleButtonClick = (index) => {
        setSelected(index);
    };

    return (
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

            {/* Conteúdo do componente CarroMovimentoEsquerdaDireita incorporado aqui */}
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                    style={{ display: 'flex', alignItems: 'center' }} // Estilo do contêiner pai
                >
                    <motion.div
                        initial={{ x: -500, rotate: 0 }} // Posição inicial à esquerda da tela e sem rotação
                        animate={{ x: 500, rotate: 0 }} // Posição final à direita da tela e sem rotação
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }} // Duração da animação e repetição infinita
                        style={{ width: 100, height: 100, marginRight: 10 }} // Estilo do contêiner da primeira imagem
                    >
                        <img src="/images/E.png" alt="Atletismo" style={{ width: '100%', height: '100%', transformOrigin: '50% 50%' }} />
                    </motion.div>
                    <motion.div
                        initial={{ x: -500, rotate: 0 }}
                        animate={{ x: 500, rotate: 0 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        style={{ width: 100, height: 100, marginRight: 10 }}
                    >
                        <img src="/images/E.png" alt="Atletismo" style={{ width: '100%', height: '100%', transformOrigin: '50% 50%' }} />
                    </motion.div>
                    <motion.div
                        initial={{ x: -500, rotate: 0 }}
                        animate={{ x: 500, rotate: 0 }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        style={{ width: 100, height: 100, marginRight: 10 }}
                    >
                        <img src="/images/E.png" alt="Atletismo" style={{ width: '100%', height: '100%', transformOrigin: '50% 50%' }} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Principal;
