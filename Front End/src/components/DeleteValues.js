import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
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
            height: '21%',
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
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
  },
});

export default function DeleteValues({open, handleClose, deleteHandler, isSelected}) {

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Records ?</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete record[s] ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCLE</Button>
          <Button onClick={()=>deleteHandler(isSelected)}>DELETE</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </div>
  );
}
