import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { FormControl , TextField, Button } from '@mui/material';
import "./styles.css";


export const RegisterPage = () => {
    
    const { 
        newUser,
        setUserName,
        setPassword,
        validateForm,
        errors
    } = useContext(UserContext)


    const handleRegister = () => {
        if (validateForm()) {
            newUser();
        }
    };

    return (
        <main id="main-register">
            <section className="section-form">
                <h2>Cadastro</h2>
                <FormControl fullWidth={true}>
                    <TextField 
                        id="name" 
                        required="true" 
                        margin="dense"
                        type="text" 
                        label="Username" 
                        variant="outlined" 
                        onChange={(e) => setUserName(e.target.value)}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField 
                        id="password" 
                        required="true" 
                        margin="dense"
                        type="password" 
                        label="Senha" 
                        variant="outlined" 
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                </FormControl>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleRegister}
                    >Cadastrar</Button>   
                <span>Retorne para a tela de <Link to="/"> Login</Link></span>               
            </section>         
        </main>
    )
}