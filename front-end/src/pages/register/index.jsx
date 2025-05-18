import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { FormControl, TextField, Button } from "@mui/material";
import "./styles.css";
import Header from "../../components/header";
import { useTheme } from "@emotion/react";

export const RegisterPage = () => {
  const {
    newUser,
    setName,
    setEmail,
    setUsername,
    setPassword,
    validateForm,
    errors,
  } = useContext(UserContext);

  const handleRegister = () => {
    if (validateForm()) {
      newUser();
    }
  };

  useTheme();

  return (
    <main id="main-register">
      <Header></Header>
      <section className="section-form">
        <h2>Cadastro</h2>
        <FormControl fullWidth={true}>
          <TextField
            id="name"
            margin="dense"
            type="text"
            label="Nome"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            },
                        }}
            color="secondary"
          />
          <TextField
            id="email"
            margin="dense"
            type="email"
            label="E-mail"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            },
                        }}
            color="secondary"
          />
          <TextField
            id="username"
            margin="dense"
            type="text"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(errors.username)}
            helperText={errors.username}
            sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            },
                        }}
            color="secondary"
          />
          <TextField
            id="password"
            margin="dense"
            type="password"
            label="Senha"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
            sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            },
                        }}
            color="secondary"
          />
        </FormControl>
        <Button 
            size="large" 
            color="primary" 
            variant="contained" 
            onClick={handleRegister}
        >
          Cadastrar
        </Button>
        <span>
          Retorne para a tela de <Link to="/"> Login</Link>
        </span>
      </section>
    </main>
  );
};
