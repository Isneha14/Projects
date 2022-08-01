import {
    Button,
    TextField,
    Typography,
} from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import React, {useState } from "react";
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
            height: '75%',
            width: '90%'
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

function AnalyticsView({ onAnalyticsClick, handleClose, open }) {
    const [clearDate, setClearDate] = useState(["", ""]);
    const [dueDate, setDueDate] = useState(["", ""]);
    const [baselineDate, setBaselineDate] = useState(["", ""]);
    const [invoiceCurr, setInvoiceCurr] = useState("");

    const [invalidCols, setInvalidCols] = useState([]);
    const validateData = () => {
            onAnalyticsClick(clearDate, dueDate, baselineDate, invoiceCurr);
    };

    return (
        <>
        <ThemeProvider theme={theme}>
        <div>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Analytical View</DialogTitle>
            <DialogContent>
                {/* Clear date */}
                <Typography>Clear Date</Typography>
                    <TextField
                        type={"date"}
                        label="From"
                        required={false}
                        value={clearDate[0]}
                        onChange={(e) => {
                            let cleardate = [
                                e.target.value,
                                clearDate[1],
                            ];

                            setClearDate(cleardate);
                        }}
                    />
                    <TextField
                        type={"date"}
                        label="To"
                        required={false}
                        value={clearDate[1]}
                        onChange={(e) => {
                            let cleardate = [
                                clearDate[0],
                                e.target.value,
                            ];
                            setClearDate(cleardate);
                        }}
                    />
                {/* Due date */}
                <Typography>Due Date</Typography>
                <div style={{ margin: "0.4rem 0.5rem" }}>
                    <TextField
                        type={"date"}
                        label="From"
                        required={false}
                        value={dueDate[0]}
                        onChange={(e) => {
                            let duedate = [
                                e.target.value,
                                dueDate[1],
                            ];
                            setDueDate(duedate);
                        }}
                    />
                </div>
                <div style={{ margin: "0.4rem 0.5rem" }}>
                    <TextField
                        type={"date"}
                        label="To"
                        required={false}
                        value={dueDate[1]}
                        onChange={(e) => {
                            let duedate = [
                                dueDate[0],
                                e.target.value,
                            ];
                            setDueDate(duedate);
                        }}
                    />
                </div>
                </DialogContent>
                <DialogContent>
                    {/* Baseline Create Date */}
                    <Typography>Baseline Create Date</Typography>
                        <TextField
                            type={"date"}
                            label="From"
                            required={false}
                            value={baselineDate[0]}
                            onChange={(e) => {
                                let baselinedate = [
                                    e.target.value,
                                    baselineDate[1],
                                ];
                                setBaselineDate(baselinedate);
                            }}
                        />
                        <TextField
                            type={"date"}
                            label="To"
                            required={false}
                            value={baselineDate[1]}
                            onChange={(e) => {
                                let baselinedate = [
                                    baselineDate[0],
                                    e.target.value,
                                ];
                                setBaselineDate(baselinedate);
                            }}
                        />
                    {/* Invoice Currency */}
                    <Typography>Invoice Currency</Typography>
                        <TextField
                            label="Invoice Currency"
                            required={false}
                            value={invoiceCurr}
                            onChange={(e) => {
                                setInvoiceCurr(e.target.value);
                            }}
                        />
                </DialogContent>
                {/* buttons */}
                <DialogActions>
                    <Button
                        onClick={() => {
                            validateData();
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                 </DialogActions>
            </Dialog>
            </div>
            </ThemeProvider>
        </>
    );
}

export default AnalyticsView;
