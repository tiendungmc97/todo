import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface ModalNotiProps {
    message: string;
    setMessage: Function;
}

const ModalNoti: React.FC<ModalNotiProps> = (props: ModalNotiProps) => {
  const handleClose = () => {
    props.setMessage('')
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={!(!props.message)}
        fullWidth
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Thông báo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Đóng
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ModalNoti;