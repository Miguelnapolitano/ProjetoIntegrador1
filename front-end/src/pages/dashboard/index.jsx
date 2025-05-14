import { useContext, useEffect } from "react";
import Schedule from "../../components/schedule"
import "./styles.css"
import { Button } from '@mui/material';
import { DashContext } from "../../contexts/dashboardContext";
import { UserContext } from "../../contexts/userContext";
import ModalAdd from "../../components/modalAdd";
import ModalEdit from "../../components/modalEdit";


export const Dashboard = () => {
    
    const {handleAddClickOpen, getEvents} = useContext(DashContext)
    const {logout} = useContext(UserContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <main id="main-dash">
            <nav>
                <h1>AGENDA ESCOLAR</h1>
                <div id="div-buttons">
                    <Button 
                        variant="contained" 
                        color="success" 
                        onClick={handleAddClickOpen}>
                            Nova Atividade
                        </Button>
                    <Button 
                        variant="outlined" 
                        color="error"
                        onClick={logout}>
                            Sair
                    </Button>
                </div>
            </nav>
            <div id="schedule-div">
                <Schedule></Schedule>
            </div>
            <ModalAdd props={open}></ModalAdd>
            <ModalEdit props={open}></ModalEdit>
        </main>
    )
}