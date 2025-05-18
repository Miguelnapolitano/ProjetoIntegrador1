import { useContext, useEffect } from "react";
import Schedule from "../../components/schedule"
import "./styles.css"
import { Button } from '@mui/material';
import { DashContext } from "../../contexts/dashboardContext";
import { UserContext } from "../../contexts/userContext";
import ModalAddClient from "../../components/modalAddClient";
import ModalEvent from "../../components/modalEvent";


export const Dashboard = () => {
    
    const {getEvents, handleModalOpen} = useContext(DashContext)
    const {logout} = useContext(UserContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <main id="main-dash">
            <nav>
                <h1>AGENDAMENTOS</h1>
                <div id="div-buttons">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={(e) => handleModalOpen(e, 'client')}
                        >
                            Adicionar Cliente
                        </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={logout}>
                            Sair
                    </Button>
                </div>
            </nav>
            <div id="schedule-div">
                <Schedule></Schedule>
            </div>
            <ModalAddClient props={open}></ModalAddClient>
            <ModalEvent props={open}></ModalEvent>
        </main>
    )
}