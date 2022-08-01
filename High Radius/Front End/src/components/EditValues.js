import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiFormControl: {
        styleOverrides: {
        root: {
            width: "45%",
            marginRight: 20,
            backgroundColor: 'white',
            borderRadius: 5
        },
       },
    },
    MuiPaper: {
        styleOverrides: {
        root: {
            backgroundColor: '#283D4A',
            color: 'white',
            height: '28%'
        },
       },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: '50%',
          color: 'white',
          border: '1px solid white'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: 10
        }
      }
    },
  },
});

export default function EditValues({open, handleClose, invoice_currency, cust_payment_terms, changeHandler}) {

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="invoice_currency"
            label="Invoice Currency"
            value={invoice_currency}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cust_payment_terms"
            label="Customer Payment Terms"
            value={cust_payment_terms}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>EDIT</Button>
          <Button onClick={() => handleClose(false)}>CANCLE</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}
