import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DashContext } from '../../contexts/dashboardContext';
import { useContext } from 'react';
import { FormControl, TextField } from '@mui/material';
import './modalAdd.css'
import { useTheme } from '@emotion/react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalAddClient() {

  const { 
      modalClientOpen, 
      handleModalClose,
      setClientName,
      setClientEmail,
      setClientPhone,
      errors,
      saveClient,
      } = useContext(DashContext) 

  useTheme();

  return (
    <>
      <BootstrapDialog
        onClose={handleModalClose}
        open={modalClientOpen}
        fullWidth={true}
        maxWidth='sm'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Novo Cliente
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleModalClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <FormControl fullWidth={true}>
            <TextField 
                id='client-name'
                autoFocus={true}
                required={true} 
                margin='dense'
                type='text' 
                label='Nome' 
                variant='outlined' 
                color='success'
                onChange={(e) => setClientName(e.target.value)}
                error={Boolean(errors.clientName)}
                helperText={errors.clientName}
            />
            <div className='div-inputs'>
              <TextField 
                  id='client-email' 
                  required={true} 
                  margin='dense'
                  type='email'
                  label='E-mail'
                  variant='outlined' 
                  sx={{width: 0.98/2}}
                  color='success'
                  onChange={(e) => setClientEmail(e.target.value)}
                  error={Boolean(errors.clientEmail)}
                  helperText={errors.clientEmail}
              />
              <TextField 
                  id='client-phone' 
                  required={true} 
                  margin='dense'
                  type='text' 
                  label='Telefone' 
                  variant='outlined'                  
                  color='success'
                  placeholder='Formato: 11922223333'
                  sx={{width: 0.98/2}}
                  onChange={(e) => setClientPhone(e.target.value)}
                  error={Boolean(errors.clientPhone)}
                  helperText={errors.clientPhone}
              />
            </div>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            variant='contained' 
            color='primary'
            onClick={saveClient}
          >
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}