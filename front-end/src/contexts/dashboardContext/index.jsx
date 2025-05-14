import { createContext, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DashContext = createContext({})

export const DashProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState('');
    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [classCode, setClassCode] = useState('');
    const [content, setContent] = useState('');
    const [obs, setObs] = useState('');
    const [contemplated, setContemplated] = useState(false);
    const [satisfactory, setSatisfactory] = useState(false);
    const [allowSatisfactory, setAllowSatisfactory] = useState(false);
    const [errors, setErrors] = useState({ 
          title: '', 
          date: '',
          classCode: '',
          content: '',
          obs
        });
    
    const navigate = useNavigate();

    const handleAddClickOpen = (info) => {  
      if (!info.type){
        if (info.dateStr) {
          setDate(info.dateStr);
          setTitle('');
        }else if (info.event.startStr){
          setDate(info.event.startStr);
          setTitle(info.event.title);
          setEventId(info.event._def.publicId);
        }
      }else{
        setDate('');
        setTitle('');
      }
         
      setModalAddOpen(true);
      validateForm('openModal');
      
    };

    const handleEditClickOpen = async (data) => {

      const token = localStorage.getItem("@TOKEN__AGENDA__ESCOLAR")
      
      if (token) {
        try{
          const response = await api.get(`/agenda/${data.event._def.publicId}`, {
              headers: {
                  authorization: `Bearer ${token}`,
              },
          });

          if (response.status === 200){
            const eventInfo = response.data;
            setEventId(eventInfo.id)
            setTitle(eventInfo.title);
            setDate(eventInfo.date.split('T')[0]);
            setClassCode(eventInfo.class);
            setContent(eventInfo.content);
            setContemplated(eventInfo.contempled);
            setAllowSatisfactory(eventInfo.contempled);
            setSatisfactory(eventInfo.satisfactory);
            setObs(eventInfo.obs);
            setModalEditOpen(true);
          }

        }catch(err){
            console.log(err)
            toast.error('Ops! Algo deu errado.', {
              position: 'top-center',
              autoClose: 2000,
            });                
        }
      }else{
        navigate('/')
      }      
              
    };

    const handleModalClose = () => {
      setModalAddOpen(false);
      setModalEditOpen(false);
      setEventId('')
      setTitle('');
      setDate('');
      setClassCode('');
      setContent('');
      setObs('');
      setContemplated(false);
      setAllowSatisfactory(false);
      setSatisfactory(false);
      
    };

    const validateForm = (action='check') => {
        let isValid = true;
        if (action==='openModal') {
          setContent('')     
          setErrors({})    
          return      
        }
        const newErrors = { 
            title: '',
            date: '',
            classCode: '',
            content: ''
          };

        if (!title) {
            newErrors.title = "O Título é obrigatório.";
            isValid = false;
        }

        if (!date) {
            newErrors.date = "A Data é obrigatória.";
            isValid = false;
        }
        
        if (!classCode) {
            newErrors.classCode = "A Classe é obrigatória.";
            isValid = false;
        }
        
        if (!content) {
            newErrors.content = "O conteúdo planejado é obrigatória.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const saveActivity = () => {
      const isValid = validateForm();
      if (!isValid) return;
      createEvent({title, date, class: classCode, content});
      
      setTitle('');     
      setDate('');     
      setClassCode('');     
      setContent('');   
      setModalAddOpen(false);
    }
    
    const updateActivity = () => {
      const isValid = validateForm() 
      if (!isValid) return;
      updateEvent();
    }

    const checkRadios = (e) => {
      const contemplatedVal = e.target.value;
      setContemplated(Boolean(contemplatedVal));     
      setAllowSatisfactory(contemplatedVal === 'true');
    }

    const getEvents = async () => {
        const token = localStorage.getItem("@TOKEN__AGENDA__ESCOLAR")
        
        if (token) {
          try{
              const response = await api.get('/agenda', {
                  headers: {
                      authorization: `Bearer ${token}`,
                  },
              });

              if (response.status === 200){
                  const eventsFormat = response.data.map(event => {
                    const formattedDate = event.date.split('T')[0]  
                    return {
                        id: event.id,
                        title: event.title,
                        startStr: formattedDate,
                        date: formattedDate                  
                      }
                  })
                  setEvents(eventsFormat);
              }

          }catch(err){
              console.log(err)  
              if (err.status === 401){
                navigate('/')
              }              
          }
        }else{
          navigate('/')
        }
    }

    const createEvent = async (data) => {
      const token = localStorage.getItem("@TOKEN__AGENDA__ESCOLAR")
      
      if (token) {
        try{
            const response = await api.post('/agenda', data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201){
              
                setEvents([...events, {
                  id: response.data.id,
                  title: response.data.title,
                  startStr: response.data.date.split('T')[0] ,
                  date: response.data.date.split('T')[0]                   
                }]);
                toast.success('Atividade criada com sucesso!', {
                  position: 'top-center',
                  autoClose: 2000,
                });
            }

        }catch(err){
            console.log(err)
            if (err.status === 401){
              navigate('/');
            }
            toast.error('Ops! Algo deu errado.', {
              position: 'top-center',
              autoClose: 2000,
            });                
        }
      }
    }

    const updateEvent = async () => {
      const token = localStorage.getItem("@TOKEN__AGENDA__ESCOLAR")
      
      if (token) {
        const data = {
          title,
          class: classCode,
          date,
          content,
          contempled: contemplated,
          satisfactory,
          obs
        }        
        try{
            console.log(data)
            const response = await api.put(`/agenda/${eventId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200){
                const index = events.findIndex(event => event.id == eventId)
                events[index] = {
                  id: response.data.id,
                  title: response.data.title,
                  startStr: response.data.date.split('T')[0] ,
                  date: response.data.date.split('T')[0]                   
                }
                               
                setEvents([...events]);
                setContemplated(response.data.contempled);
                setSatisfactory(response.data.satisfactory);
                setObs(response.data.obs);

                toast.success('Atividade atualizada com sucesso!', {
                  position: 'top-center',
                  autoClose: 2000,
                });
            }

        }catch(err){
            console.log(err)
            if (err.status === 401){
              navigate('/');
            }
            toast.error('Ops! Algo deu errado.', {
              position: 'top-center',
              autoClose: 2000,
            });                
        }
      }
  }
  
    return (
      <DashContext.Provider value={{
          events,
          modalAddOpen, 
          modalEditOpen,
          handleAddClickOpen, 
          handleEditClickOpen,
          handleModalClose,
          title,
          setTitle,
          date,
          setDate,
          classCode,
          setClassCode,
          content,
          setContent,
          contemplated,
          satisfactory,
          setSatisfactory,
          obs,
          setObs,
          allowSatisfactory,
          validateForm,
          errors,
          saveActivity,
          editActivity: updateActivity,
          checkRadios,
          getEvents
        }}>
        {children}
      </DashContext.Provider>
    );
  };