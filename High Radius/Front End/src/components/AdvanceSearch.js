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
            margin: '15px 10px',
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
            height: '40%',
            // margin: 20
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
          paddingTop: 10,
        }
      }
    },
  },
});

function AdvanceSearch({open, handleClose, onSearchClick}) {
    const [docId, setDocId] = React.useState("");
    const [invoiceId, setInvoiceId] = React.useState("");
    const [custNumber, setCustNumber] = React.useState("");
    const [year, setYear] = React.useState("");

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Advance Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="doc_id"
            label="Document Id"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            type="text"
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="invoice_id"
            label="Invoice Id"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            type="text"
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="cust_number"
            label="Customer Number"
            value={custNumber}
            onChange={(e) => setCustNumber(e.target.value)}
            type="text"
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="buisness_year"
            label="Business Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="text"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
                onSearchClick(
                    docId,
                    invoiceId,
                    custNumber,
                    year
                );
            }}
          >SEARCH</Button>
          <Button onClick={handleClose}>CANCLE</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default AdvanceSearch;