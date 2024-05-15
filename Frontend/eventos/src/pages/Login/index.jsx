import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { LayoutComponents } from "../../components/LayoutComponents";
import jpIMG from "../../assets/logo.png";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Use o hook useNavigate

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/login", {
                email: email,
                password: password
            });
            console.log(response.data);
            // Redireciona para a página principal após o login bem-sucedido
            navigate("/principal");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <LayoutComponents>
            <form className="login-form">
                <span className="login-form-title"> Bem vindo </span>
                <span className="login-form-title">
                    <img src={jpIMG} alt="logo" />
                </span>

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
                    <button className="login-form-btn" onClick={handleLogin}>Login</button>
                </div>

                <div className="text-center">
                    <span className="txt1">Não possui conta? </span>
                    <Link className="txt2" to="/register">Criar conta.</Link>
                </div>
            </form>
        </LayoutComponents>
    );
};
