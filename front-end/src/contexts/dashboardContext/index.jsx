import { createContext, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DashContext = createContext({});

export const DashProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [scheduleEvents, setScheduleEvents] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientsOpt, setClientsOpt] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [modalClientOpen, setModalClientOpen] = useState(false);
  const [modalEventOpen, setModalEventOpen] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [errors, setErrors] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const navigate = useNavigate();

  const getEvents = async () => {
    const token = localStorage.getItem("@TOKEN__AGENDA");

    if (token) {
      try {
        const response = await api.get("/atendimentos", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setEvents(response.data);
          const formatedEvents = response.data.map((event) => {
            return {
              id: event.id,
              title: event.cliente.nome,
              start: event.data,
            };
          });
          setScheduleEvents(formatedEvents);
        }
      } catch (err) {
        console.log(err);
        if (err.status === 401) {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
  };

  const getClients = async () => {
    const token = localStorage.getItem("@TOKEN__AGENDA");

    if (token) {
      try {
        const response = await api.get("/clientes", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const options = response.data.map((opt) => {
            return { label: opt.nome, id: opt.id };
          });
          setClients(response.data);
          setClientsOpt(options);
          return;
        }
      } catch (err) {
        console.log(err);
        if (err.status === 401) {
          navigate("/");
        }
      }
    } else {
      navigate("/");
    }
  };

  const handleModalOpen = (e, modal) => {
    switch (modal) {
      case "client":
        setModalClientOpen(true);
        setClientName(clientName);
        setClientEmail(clientEmail);
        setClientPhone(clientPhone);
        break;
      case "event": {
        if (e.event) {
          const ev = events.find(
            (ev) => ev.id === parseInt(e.event._def.publicId)
          );
          handleSelectClient({
            label: ev.cliente.nome,
            id: ev.cliente.id,
          });
          setDate(ev.data);
          setHour(ev.hora);
        } else {
          setDate(e.dateStr);
        }
        setModalEventOpen(true);

        break;
      }
    }
  };

  const handleModalClose = () => {
    setModalClientOpen(false);
    setModalEventOpen(false);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setSelectedClient(null);
    setDate("");
    setHour("");
  };

  const validateClientForm = () => {
    let isValid = true;
    const newErrors = {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
    };

    if (!clientName) {
      newErrors.clientName = "O Nome é obrigatório.";
      isValid = false;
    }

    if (!clientEmail) {
      newErrors.clientEmail = "O E-mail é obrigatório.";
      isValid = false;
    } else if (!clientEmail.includes("@")) {
      newErrors.email = "Formato do email incorreto.";
      isValid = false;
    }

    if (!clientPhone) {
      newErrors.clientPhone = "O Telefone é obrigatório.";
      isValid = false;
    } else if (clientPhone.length !== 11) {
      newErrors.clientPhone = "O formato correto é 11922223333";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveClient = async () => {
    const isValid = validateClientForm();
    if (!isValid) return;
    await createClient();
    handleModalClose();
  };

  const createClient = async () => {
    const token = localStorage.getItem("@TOKEN__AGENDA");

    if (token) {
      try {
        const response = await api.post(
          "/clientes",
          {
            nome: clientName,
            email: clientEmail,
            telefone: clientPhone,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if ([200, 201].includes(response.status)) {
          toast.success(
            `Cliente "${clientName.split(" ")[0]}" criado com sucesso!"`,
            {
              position: "top-center",
              autoClose: 2000,
            }
          );
        }
      } catch (err) {
        console.log(err);
        if (err.status === 401) {
          navigate("/");
        }
        toast.error("Ops! Algo deu errado.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const handleSelectClient = (selection) => {
    const info = clients.find((c) => c.id === selection.id);
    setSelectedClient(selection);
    setClientEmail(info.email);
    setClientPhone(info.telefone);
  };

  const saveEvent = async () => {
    const token = localStorage.getItem("@TOKEN__AGENDA");

    if (token) {
      try {
        const response = await api.post(
          `/atendimentos?cliente=${selectedClient.id}`,
          {
            data: date,
            hora: hour + ":00",
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if ([200, 201].includes(response.status)) {
          const event = response.data;
          setEvents([...events, event]);
          const client = clients.find((c) => (c.id = event.clienteId));
          setScheduleEvents([
            ...scheduleEvents,
            {
              id: event.id,
              title: client.nome,
              start: event.data,
            },
          ]);
          toast.success("Atendimento criado com sucesso!", {
            position: "top-center",
            autoClose: 2000,
          });
          setModalEventOpen(false);
        }
      } catch (err) {
        console.log(err);
        if (err.status === 401) {
          navigate("/");
        }
        toast.error("Ops! Algo deu errado.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <DashContext.Provider
      value={{
        saveEvent,
        scheduleEvents,
        getEvents,
        handleModalOpen,
        modalClientOpen,
        modalEventOpen,
        handleModalClose,
        clientName,
        setClientName,
        clientEmail,
        setClientEmail,
        clientPhone,
        setClientPhone,
        validateClientForm,
        clients,
        clientsOpt,
        selectedClient,
        handleSelectClient,
        getClients,
        errors,
        saveClient,
        date,
        setDate,
        hour,
        setHour,
      }}
    >
      {children}
    </DashContext.Provider>
  );
};
