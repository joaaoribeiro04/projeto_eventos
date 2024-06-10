import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { LayoutComponents } from "../../components/LayoutComponents";
import jpIMG from "../../assets/logo.png";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:8000/api/login", {
                email: email,
                password: password
            });
            
            // Verificar o tipo de usuário retornado pela resposta
            if (response.data.userType === "promoter") {
                // Se for promotor, redirecionar para a página de inscritos
                navigate("/admin", { replace: true });
            } else {
                // Se for usuário comum, redirecionar para a página principal
                navigate("/", { replace: true });
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Credenciais inválidas");
        }
    };

    return (
        <LayoutComponents>
            <form className="login-form" onSubmit={handleLogin}>
                <span className="login-form-title"> Bem vindo </span>
                <span className="login-form-title">
                    <Link to="/">
                        <img src={jpIMG} alt="logo" />
                    </Link>
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
                    <button type="submit" className="login-form-btn">Login</button>
                </div>

                <div className="text-center">
                    <span className="txt1">Não possui conta? </span>
                    <Link className="txt2" to="/register">Criar conta.</Link>
                </div>
            </form>

            {error && 
                <div className="error-message-wrapper">
                    <div className="error-message">{error}</div>
                </div>
            }
        </LayoutComponents>
    );
};
