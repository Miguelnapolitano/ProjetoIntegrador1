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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalAdd() {

  const { 
      modalAddOpen, 
      handleModalClose,
      title,
      setTitle,
      date,
      setDate,
      setClassCode,
      content,
      setContent,
      errors,
      saveActivity,
      } = useContext(DashContext) 


  return (
    <>
      <BootstrapDialog
        onClose={handleModalClose}
        open={modalAddOpen}
        fullWidth={true}
        maxWidth='sm'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Nova Atividade
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
                id='title'
                autoFocus={true}
                required={true} 
                margin='dense'
                type='text' 
                label='Título' 
                variant='outlined' 
                color='success'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={Boolean(errors.title)}
                helperText={errors.title}
            />
            <div className='div-inputs'>
              <TextField 
                  id='date' 
                  required={true} 
                  margin='dense'
                  type='date'
                  variant='outlined' 
                  sx={{width: 0.98/2}}
                  color='success'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  error={Boolean(errors.date)}
                  helperText={errors.date}
              />
              <TextField 
                  id='class' 
                  required={true} 
                  margin='dense'
                  type='text' 
                  label='Turma' 
                  variant='outlined'                  
                  color='success' 
                  sx={{width: 0.98/2}}
                  onChange={(e) => setClassCode(e.target.value)}
                  error={Boolean(errors.classCode)}
                  helperText={errors.classCode}
              />
            </div>
            <TextField 
                  id='content' 
                  required={true} 
                  margin='dense'
                  type='text' 
                  label='Conteúdo Planejado'
                  variant='outlined' 
                  multiline={true}
                  minRows={5}
                  color='success'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  error={Boolean(errors.content)}
                  helperText={errors.content}
              />
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            variant='contained' 
            color='success'
            onClick={saveActivity}
          >
            Salvar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}