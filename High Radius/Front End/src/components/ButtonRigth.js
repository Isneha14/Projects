import { Grid, Button, ButtonGroup, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import AddDialogBox from './AddDialogBox';
import EditValues from './EditValues';
import DeleteValues from './DeleteValues';
import * as React from 'react';
import { addValue, deleteValue } from '../services/Data';
import {getData, updateValue} from '../services/Data';


const useStyles = makeStyles({
    btn: {
        color: 'white',
        width: 180,
        borderRadius: 5,
        padding: 5,
        marginLeft: 15,
        border: '1.8px solid #3492ca',
    },
})

function Buttons(isSelected)
{
    let arr = Object.values(isSelected);
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const[add, AddValue] = useState({
        business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', 
        posting_date: '', document_create_date: '', due_in_date: '', invoice_currency: '',
        document_type: '', posting_id: '', total_open_amount: '', baseline_create_date: '', 
        cust_payment_terms: '', invoice_id: ''
    });

    const{business_code, cust_number, clear_date, buisness_year, doc_id, 
        posting_date, document_create_date, due_in_date, invoice_currency, document_type,
        posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id} = add;

    const changeHandler= (e) =>{     
        const{ id, value } = e.target;
        AddValue({ ...add, [id]: value});
    };

    let today= new Date();
    let year = today.getFullYear();
    let month = parseInt(today.getMonth()+1)<10 ? '0' +(today.getMonth()+1) :(today.getMonth() +1);
    let day = today.getDate();
    let dt= year+'-'+month+'-'+day;

    const submitHandler = async  (e) =>{
        e.preventDefault();

        if(add.clear_date==""){
            add.clear_date=dt;
        }
        if(add.posting_date==""){
            add.posting_date=dt;
        }
        if(add.document_create_date==""){
            add.document_create_date=dt;
        }
        if(add.due_in_date==""){
            add.due_in_date=dt;
        }
        if(add.baseline_create_date==""){
            add.baseline_create_date=dt;
        }


        let response = await addValue(add);
        if(response){
            AddValue({business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', 
            posting_date: '', document_create_date: '', due_in_date: '', invoice_currency: '',
            document_type: '', posting_id: '', total_open_amount: '', baseline_create_date: '', 
            cust_payment_terms: '', invoice_id: ''})
        }
        window.location.reload(true);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        AddValue({sl_no:'',business_code: '', cust_number: '', clear_date: '', buisness_year: '', doc_id: '', 
            posting_date: '', document_create_date: '', due_in_date: '', invoice_currency: '',
            document_type: '', posting_id: '', total_open_amount: '', baseline_create_date: '', 
            cust_payment_terms: '', invoice_id: ''})
        setOpen(false);
    };


    
    const [data,  setData] = useState([]);
    useEffect(async () => {
            setData(await getData())
    }, []);

    const handleEditClickOpen = () => {
        let edt = data.filter(edit => edit.sl_no === arr[0][0])[0] ;
        AddValue(edt)
        setEditOpen(true);
    };

    const editChangeHandler = (e) => {
        const{ id, value } = e.target;
        AddValue({ ...add, [id]: value});
    }

    const handleEditClickClose = async (update) => {
        if(update){
            let res =  await updateValue(add);
            window.location.reload(true);
            setOpen(false);
        }
        setEditOpen(false);
    }
    
    const handleDeleteClickOpen = () => {
        let del = data.filter(edit => edit.sl_no === arr[0][0])[0] ;
        AddValue(del)
        setDeleteOpen(true);
    };

    const handleDeleteClickClose = () => {
        AddValue({sl_no:''})
        setDeleteOpen(false);
    };

    const deleteHandler = async (numb) =>{
        numb.forEach(async element => { 
            let del = data.filter(edit => edit.sl_no === element)[0] ;
            let response= await deleteValue(del);
        });
        window.location.reload(true);
        setDeleteOpen(false);
    }


    const classes = useStyles()
    return(
    <>
    <Grid container alignItems = 'center' width="100%">
            <Grid item >
                <ButtonGroup 
                    aria-label="outlined primary button group" 
                    size="large" 
                    color="primary" 
                >
                    <Button className= {classes.btn} onClick={handleClickOpen}>ADD</Button>
                    <AddDialogBox open={open} handleClose={handleClose} changeHandler={changeHandler}
                    business_code={business_code} cust_number={cust_number} clear_date={clear_date} 
                    buisness_year={buisness_year} doc_id={doc_id} posting_date={posting_date} 
                    document_create_date={document_create_date} due_in_date={due_in_date} 
                    invoice_currency={invoice_currency} document_type={document_type}
                    posting_id={posting_id} total_open_amount={total_open_amount} 
                    baseline_create_date={baseline_create_date} cust_payment_terms={cust_payment_terms} 
                    invoice_id={invoice_id} submitHandler={submitHandler}
                        />

                    <Button className= {classes.btn} disabled={(arr[0].length===1)?false:true} onClick={handleEditClickOpen}>EDIT</Button>
                    <EditValues 
                    open={editOpen} handleClose={handleEditClickClose} changeHandler={editChangeHandler}
                    invoice_currency={invoice_currency} cust_payment_terms={cust_payment_terms}
                    />

                    <DeleteValues 
                    open={deleteOpen} handleClose={handleDeleteClickClose} 
                    deleteHandler={deleteHandler} isSelected={arr[0]}
                    />
                    <Button
                        className= {classes.btn} 
                        onClick={(arr[0].length>0)?handleDeleteClickOpen:handleDeleteClickClose}
                        sx = {{borderColor: 'primary.main'}}
                        >DELETE</Button>

                </ButtonGroup>
            </Grid>
            </Grid>
        </>
    )
}

export default Buttons;