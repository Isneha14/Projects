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
            width: "23.5%",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 25,
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
            height: '63%'
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
    }
  },
});



export default function AddDialogBox({
  open, handleClose, changeHandler, submitHandler,
  business_code, cust_number, clear_date, buisness_year, doc_id, 
  posting_date, document_create_date, due_in_date, invoice_currency, document_type,
  posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id}) {

    let today= new Date();
    let year = today.getFullYear();
    let month = parseInt(today.getMonth()+1)<10 ? '0' +(today.getMonth()+1) :(today.getMonth() +1);
    let day = today.getDate();
    let dt= year+'-'+month+'-'+day;
  
  return (
    <div>
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="business_code"
            label="Bussiness Code"
            value={business_code}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cust_number"
            label="Customer Number"
            value = {cust_number}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="clear_date"
            label="Clear Date"
            value = {clear_date=="" ?dt:clear_date}
            type="date"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="buisness_year"
            label="Bussiness Year"
            value = {buisness_year}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="doc_id"
            label="Document Id"
            value = {doc_id}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="posting_date"
            label="Posting Date"
            value = {posting_date=="" ?dt:posting_date}
            type="date"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="document_create_date"
            label="Document Create Date"
            value = {document_create_date=="" ?dt:document_create_date}
            type="date"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="due_in_date"
            label="Due Date"
            value = {due_in_date=="" ?dt:due_in_date}
            type="date"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="invoice_currency"
            label="Invoice Currency"
            value = {invoice_currency}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="document_type"
            label="Document Type"
            value = {document_type}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="posting_id"
            label="Posting Id"
            value = {posting_id}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="total_open_amount"
            label="Total Open Amount"
            value = {total_open_amount}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="baseline_create_date"
            label="Baseline Create Date"
            value = {baseline_create_date=="" ?dt:baseline_create_date}
            type="date"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cust_payment_terms"
            label="Customer Payment Terms"
            value = {cust_payment_terms}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="invoice_id"
            label="Invoice Id"
            value = {invoice_id}
            type="text"
            variant="filled"
            onChange={changeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler}>ADD</Button>
          <Button onClick={handleClose}>CANCLE</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}
