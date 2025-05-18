import {Link} from "react-router-dom"
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect } from "react";
import { FormControl , TextField, Button } from '@mui/material';
import Header from "../../components/header";
import { useTheme } from '@mui/material/styles';
import "./styles.css";


export const LoginPage = () => {
    
    const { 
        signIn, 
        autoLogin,
        errors,
        validateForm,
        setLogin,
        setPassword
    } = useContext(UserContext)


    useEffect(()=>{
        autoLogin();
    }, [])

    const handleLogin = () => {
        if (validateForm(true)) {
            signIn();
        }
    };

    useTheme()

    return (
        <main id="main-login">
            <Header></Header>
            <section className="section-form">
                <h2>Login</h2>
                <FormControl fullWidth={true}>
                    <TextField 
                        id="login" 
                        margin="dense"
                        type="text" 
                        label="Username ou Email" 
                        variant="outlined" 
                        color="secondary"
                        onChange={(e) => setLogin(e.target.value)}
                        error={Boolean(errors.login)}
                        helperText={errors.login}
                        sx={{
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'divider' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            },
                        }}
                    />
                    <TextField 
                        id="password" 
                        margin="dense"
                        type="password" 
                        label="Senha" 
                        variant="outlined"                         
                        color="secondary"
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
                    />
                </FormControl>
                <Button 
                    size="large" 
                    color="primary" 
                    variant="contained"
                    onClick={handleLogin}
                >
                    Entrar
                </Button>
                <span>
                    É novo(a) por aqui?<Link to="/register"> Cadastre-se</Link> e aproveite!
                </span>
                    
            </section>         
        </main>
    )
}