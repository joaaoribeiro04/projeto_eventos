import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { LayoutComponents } from "../../components/LayoutComponents";
import jpIMG from "../../assets/logo.png";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate(); 

    const handleRegister = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        try {
            const response = await axios.post("http://localhost:8000/api/register", {
                name: name,
                email: email,
                password: password
            });
            console.log(response.data);
            // Redireciona para a página de login após o registo bem-sucedido
            navigate("/login");
        } catch (error) {
            console.error("Erro ao registar:", error);
        }
    };

    return (
        <LayoutComponents>
            <form className="login-form" onSubmit={handleRegister}>
                <span className="login-form-title"> Criar Conta </span>
                <span className="login-form-title">
                    <img src={jpIMG} alt="logo" />
                </span>

                <div className="wrap-input">
                    <input
                        className={name !== "" ? "has-val input" : "input"}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                    />
                    <span className="focus-input" data-placeholder="Nome"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={email !== "" ? "has-val input" : "input"}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={password !== "" ? "has-val input" : "input"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="container-login-form-btn">
                    <button type="submit" className="login-form-btn">Registar</button>
                </div>

                <div className="text-center">
                    <span className="txt1">Já possui conta? </span>
                    <Link className="txt2" to="/login">Login.</Link>
                </div>
            </form>
        </LayoutComponents>
    );
};
