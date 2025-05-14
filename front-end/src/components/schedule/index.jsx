import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import interactionPlugin from '@fullcalendar/interaction'
import { useContext } from 'react';
import { DashContext } from '../../contexts/dashboardContext';

export default function Schedule() {

  const {handleAddClickOpen, handleEditClickOpen, events} = useContext(DashContext)

  return (    
    <FullCalendar
      plugins={[ dayGridPlugin, bootstrap5Plugin, interactionPlugin ]}
      initialView="dayGridMonth"
      themeSystem='bootstrap5'
      height={500}     
      locale={'pt-br'}
      editable={true}
      dateClick={handleAddClickOpen}
      eventClick={handleEditClickOpen}
      events={events}
    />
  )
}