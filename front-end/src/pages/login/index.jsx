import {Link} from "react-router-dom"
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect } from "react";
import { FormControl , TextField, Button } from '@mui/material';
import "./styles.css";


export const LoginPage = () => {
    
    const { 
        login, 
        autoLogin,
        errors,
        validateForm,
        setUserName,
        setPassword
    } = useContext(UserContext)


    useEffect(()=>{
        autoLogin();
    }, [])

    const handleLogin = () => {
        if (validateForm()) {
            login();
        }
    };

    return (
        <main id="main-login">
            <section className="section-form">
                <h2>Login</h2>
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
                <Button variant="outlined" color="primary" onClick={handleLogin}>Entrar</Button>
                <span>É novo(a) por aqui?<Link to="/register"> Cadastre-se</Link> e aproveite!</span>
                    
            </section>         
        </main>
    )
}