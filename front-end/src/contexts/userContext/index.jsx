import { createContext, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    login: "",
  });

  const navigate = useNavigate();

  const validateForm = (isLogin = false) => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      username: "",
      password: "",
      login: "",
    };

    if (isLogin) {
      if (!login) {
        newErrors.login = "Email ou Username obrigatório.";
        isValid = false;
      }
    } else {
      if (!name) {
        newErrors.name = "Nome Completo é obrigatório.";
        isValid = false;
      }

      if (!email) {
        newErrors.email = "Email é obrigatório.";
        isValid = false;
      } else if (!email.includes("@")) {
        newErrors.email = "Formato do email incorreto.";
        isValid = false;
      }

      if (!username) {
        newErrors.username = "Username é obrigatório.";
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const signIn = async () => {
    try {
      const response = await api.post("/login", {
        usuario: login,
        senha: password,
      });

      if (response.status === 200) {
        localStorage.setItem("@TOKEN__AGENDA", await response.data.acesso);

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (err) {
      if (err.response.data === "Cannot find user") {
        return toast.warn("Ops! Senha ou usuário incorreto.", {
          position: "top-center",
          autoClose: 20000,
        });
      }

      return toast.error("Ops! Algo deu errado!", {
        position: "top-center",
        autoClose: 20000,
      });
    }
  };

  const newUser = async () => {
    try {
      const data = {
        nome: name,
        senha: password,
        email,
        username,
      };

      await api.post("/profissionais", data);

      toast.success("Usuário cadastrado com sucesso!", {
        position: "top-center",
        autoClose: 2000,
      });

      setName("");
      setEmail("");
      setUsername("");
      setPassword("");

      setTimeout(() => navigate(""), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Ops! Algo deu errado!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const autoLogin = async () => {
    const token = localStorage.getItem("@TOKEN__AGENDA");
    if (token) {
      try {
        const response = await api.post(
          "/auth",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          return navigate("/dashboard");
        }
        return navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("@TOKEN__AGENDA");
    setLogin("");
    setPassword("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        setName,
        setEmail,
        setUsername,
        setPassword,
        setLogin,
        validateForm,
        errors,
        signIn,
        newUser,
        autoLogin,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
