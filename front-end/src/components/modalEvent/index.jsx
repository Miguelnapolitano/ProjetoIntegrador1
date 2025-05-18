import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { DashContext } from "../../contexts/dashboardContext";
import { useContext } from "react";
import { 
  TextField, 
  Input, 
  Autocomplete, 
  Stack, 
  Chip 
} from "@mui/material";
import "./ModalEvent.css";
import { useTheme } from "@emotion/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ModalEvent() {
  const {
    modalEventOpen,
    handleModalClose,
    clientsOpt,
    selectedClient,
    handleSelectClient,
    date,
    setDate,
    hour,
    setHour,
    saveEvent,
    clientEmail,
    clientPhone
  } = useContext(DashContext);

  useTheme();

  return (
    <>
      <BootstrapDialog
        onClose={handleModalClose}
        open={modalEventOpen}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Agendar Atendimento
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleModalClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="div-inputs">
            <Autocomplete
              freeSolo
              options={clientsOpt}
              value={selectedClient}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" />
              )}
              onChange={(e, selected)=> handleSelectClient(selected)}
            />
            <Input
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              label="Hora"
              type="time"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            />
          </div>
          <Stack id="stack-chips" direction="row" spacing={1}>
            <Chip icon={<EmailIcon />} label={clientEmail} variant="outlined" />
            <Chip icon={<PhoneIcon />} label={clientPhone} variant="outlined" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={saveEvent}
          >
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
