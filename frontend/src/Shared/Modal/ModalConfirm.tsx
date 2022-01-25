import * as React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

interface ModalConfirmProps {
  message: string;
  setMessage: Function;
  answer: Function;
}

const ModalConfirm: React.FC<ModalConfirmProps> = (props: ModalConfirmProps) => {
  const handleClose = () => {
    props.setMessage('');
  };

  return (
    <div>
      <Dialog
        open={!(!props.message)}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Thông báo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.answer()}>Đồng ý</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalConfirm;