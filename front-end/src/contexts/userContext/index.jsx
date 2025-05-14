
import { createContext, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', password: '' });

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', password: '' };

        if (!userName){
            newErrors.name = 'Nome Completo é obrigatório.'
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Senha é obrigatória.';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
  
    const login = async () => {
        try{
            const response = 
                await api.post('/auth/login', 
                    {username: userName, password: password});

            if(response.status === 200){
                localStorage.setItem('@TOKEN__AGENDA__ESCOLAR', await response.data.token)
                
                setTimeout(() => {
                    navigate('/dashboard')
                }, 500)                                
            }

        }catch(err){
            if (err.response.data === 'Cannot find user'){
                toast.warn('Usuário não encontrado', {
                    position: 'top-center',
                    autoClose: 20000,
                  })
            }else if (err.response.data === 'Incorrect password'){
                toast.warn('Ops! Senha ou usuário incorreto.', {
                    position: 'top-center',
                    autoClose: 20000,
                  });
            }else{
                toast.error('Ops! Algo deu errado!', {
                    position: 'top-center',
                    autoClose: 20000,
                  });
            }           
        }
    }

    const newUser = async () => {
        try{
            
            await api.post('/auth/register', 
                {username: userName, password: password});            

            toast.success('Usuário cadastrado com sucesso!', {
                position: 'top-center',
                autoClose: 2000,
              });

            setTimeout(() => navigate(''), 2000);

        }catch(err){
            console.log(err)
            toast.error('Ops! Algo deu errado!', {
                position: 'top-center',
                autoClose: 2000,
              });
        }

    }

    const autoLogin = async () => {
        const token = localStorage.getItem('@TOKEN__AGENDA__ESCOLAR')
        
        if (token) {
            try{
                const response = await api.get('/agenda', {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200){
                    return navigate('/');
                }

            }catch(err){
                console.log(err)                
            }
        }else{
            navigate('/');
        }

    }

    const logout = () => {
        navigate('/')
        window.localStorage.clear()
    }
  
    return (
      <UserContext.Provider value={{
            userName,
            setUserName,
            password,
            setPassword,
            validateForm,
            errors,
            login, 
            newUser, 
            autoLogin, 
            logout
            }}>
        {children}
      </UserContext.Provider>
    );
  };