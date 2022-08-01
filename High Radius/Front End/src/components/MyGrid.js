import {useEffect, useState} from "react";
import {getData, predictValue} from '../services/Data';
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ButtonRight from "./ButtonRigth";
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import { Grid, Button, TextField, ButtonGroup } from '@material-ui/core';
import AdvanceSearch from "./AdvanceSearch";
import {Backdrop, CircularProgress} from "@mui/material";
import AnalyticsView from "./AnalyticView";



const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "white",
          minWidth: 73,
        },
      },
    },
    MuiCheckbox:{
      styleOverrides:{
        root:{
          color: 'white',
        },
      },
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          backgroundColor: '#283D4A',
          color: 'white'
        },
      },
    },
    MuiTablePagination:{
      styleOverrides:{
        root:{
          backgroundColor: '#283D4A',
          color: 'white'
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  btn: {
      color: 'white',
      width: 180,
      borderRadius: 5,
      padding: 5,
      marginLeft: 15,
      border: '1.8px solid #3492ca',
  },
  srcBar: {
      width: 150,
      marginBottom: 10,
      // marginLeft: 40,
      marginRight: 20,
      backgroundColor: 'white',
      borderRadius: 10
  },
  btnadv: {
      color: 'white',
      backgroundColor: '#35baf6',
      width: 180,
      borderRadius: 5,
      padding: 5,
      marginLeft: 15,
      border: '1.8px solid #70d9e7',
      '&:hover': {
          backgroundColor: '#015384'
      }
  },
  icon: {
      color: 'white',
      width: 180,
      borderRadius: 5,
      padding: 6,
      marginLeft: 5,
      border: '1.8px solid #3492ca',
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'sl_no',
    numeric: true,
    disablePadding: true,
    label: 'Sl no',
  },
  {
    id: 'business_code',
    numeric: false,
    disablePadding: false,
    label: 'Business Code',
  },
  {
    id: 'cust_number',
    numeric: true,
    disablePadding: false,
    label: 'Customer Number',
  },
  {
    id: 'clear_date',
    numeric: false,
    disablePadding: false,
    label: 'Clear Date',
  },
  {
    id: 'buisness_year',
    numeric: true,
    disablePadding: false,
    label: 'Bussiness Year',
  },
  {
    id: 'doc_id',
    numeric: false,
    disablePadding: true,
    label: 'Document Id',
  },
  {
    id: 'posting_date',
    numeric: false,
    disablePadding: false,
    label: 'Posting Date',
  },
  {
    id: 'document_create_date',
    numeric: false,
    disablePadding: false,
    label: 'Document Create Date',
  },
  {
    id: 'due_in_date',
    numeric: false,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'invoice_currency',
    numeric: false,
    disablePadding: false,
    label: 'Invoice Currency',
  },
  {
    id: 'document_type',
    numeric: false,
    disablePadding: true,
    label: 'Document Type',
  },
  {
    id: 'posting_id',
    numeric: true,
    disablePadding: false,
    label: 'Posting Id',
  },
  {
    id: 'total_open_amount',
    numeric: true,
    disablePadding: false,
    label: 'Total Open Amount',
  },
  {
    id: 'baseline_create_date',
    numeric: false,
    disablePadding: false,
    label: 'Baseline Create Date',
  },
  {
    id: 'cust_payment_terms',
    numeric: false,
    disablePadding: false,
    label: 'Customer Payment Terms',
  },
  {
    id: 'invoice_id',
    numeric: true,
    disablePadding: false,
    label: 'Invoice Id',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography>
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};




function MyGrid() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('sl_no');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  const [data,  setData] = useState([]);
  useEffect(async () => {
    setData(await getData());
  }, []);

  const reload = () => {
    setLoading(true);
    setOrder('asc');
    setSelected([]);
    setTimeout(()=>{
      setLoading(false);
    },2000)
    getData()
    .then((data)=>{
      setData(data);
      setOrderBy('sl_no');
      
    })
    
  };

  useEffect(() => {
    setData([]);
    if (reloadData) {
      reload();
      setReloadData(false);
    }
  }, [reloadData]);
  
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.sl_no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    

  const[q, setQ] =  React.useState("");
  const changeSearch = (e)=>{
    setQ(e.target.value);
  }

  function search(data){
      let toShow = data.filter((row) => row.cust_number.toString().indexOf(q) > -1 );
      return toShow;
  }

  
  const onAdvanceSearch = (docId, invoiceId, custNumber, year) => {
    setReloadData(false);
    setAdvSearch(false);
    let newFilter = {};
    if (docId) {
      newFilter["doc_id"] = docId;
    }
    if (invoiceId) {
      newFilter["invoice_id"] = invoiceId;
    }
    if (custNumber) {
      newFilter["cust_number"] = custNumber;
    }
    if (year) {
      newFilter["buisness_year"] = year;
    }

    let filDoc = data.filter((row) => (row.doc_id.toString().indexOf(newFilter.doc_id.toString()) > -1 ));
    let filCust = filDoc.filter((row) => (row.cust_number.toString().indexOf(newFilter.cust_number.toString()) > -1) );
    let filInvc = filCust.filter((row) => (row.invoice_id.toString().indexOf(newFilter.invoice_id.toString()) > -1 ));
    let filBus = filInvc.filter((row) => (row.buisness_year.toString().indexOf(newFilter.buisness_year.toString()) > -1 ));
    setData(filBus)
    if(filBus.length<1){

      setReloadData(true);
    }
    
  };

  const[advSearch, setAdvSearch] = React.useState(false);

  const advSClick = () => {
    setAdvSearch(true);
  }

  const handleAdvSClose= () => {
    setAdvSearch(false);
  }

  const[analyticView, setAnalyticView] = React.useState(false);
  const handleAnalyticOpen= () => {
    setAnalyticView(true);
  }

  const handleAnalyticClose= () => {
    setAnalyticView(false);
  }

  const[graphDialog, setOpenGraph] = React.useState(false);
  const graphCloseHandler= () => {
    setOpenGraph(false);
  }

  const onAnalyticsClick = (clearDate, dueDate, baselineDate, invoiceCurr) => {
    // setLoading(true);
    
      let newFilter = {};
      if (clearDate[0] && clearDate[1]) {
        newFilter["clearDateFrom"] = clearDate[0];
        newFilter["clearDateTo"] = clearDate[1];
      }

      if (dueDate[0] && dueDate[1]) {
        newFilter["dueDateFrom"] = dueDate[0];
        newFilter["dueDateTo"] = dueDate[1];
      }

      if (baselineDate[0] && baselineDate[1]) {
        newFilter["baselineDateFrom"] = baselineDate[0];
        newFilter["baselineDateTo"] = baselineDate[1];
      }

      if (invoiceCurr) {
        newFilter["invoiceCurr"] = invoiceCurr;
      }

      getData()
      .then((data) => {
          setAnalyticsData(data);
          // setLoading(false);
        })

        console.log(newFilter);
        // setAnalyticView(false);
        // setOpenGraph(true);
        // console.log(graphDialog)
  };
  

    const classes = useStyles()
  return (
    <>
     <Grid container alignItems = 'center' width="100%">
        <Grid item >
          <ButtonGroup 
                  aria-label="outlined primary button group" 
                  size="large" 
                  color="primary" 
                  variant="outlined"
              >
                  <Button className= {classes.btnadv} >PREDICT</Button> 

                  <Button className= {classes.btn} onClick={handleAnalyticOpen} >ANALYTICS VIEW</Button>
                  <AnalyticsView handleClose={handleAnalyticClose} open = {analyticView} onAnalyticsClick={onAnalyticsClick} />

                  <AdvanceSearch open={advSearch}  handleClose={handleAdvSClose} onSearchClick={onAdvanceSearch} />
                  <Button className= {classes.btn} onClick={advSClick}>ADVANCE SEARCH</Button>
              </ButtonGroup>
              <IconButton onClick={reload}>
                  <RefreshIcon className={classes.icon}/>
              </IconButton>
        </Grid>
        <Grid item >
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '250px' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                id="filled secondary" 
                label="Search Customer Id" 
                variant="filled" 
                value={q}
                onChange={changeSearch}
                className={classes.srcBar}
                />
            </Box>
        </Grid>
        <Grid item >
            <ButtonRight isSelected={selected}  />
        </Grid>
    </Grid>
    <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(search(data), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.sl_no}
                      </TableCell>
                      <TableCell align="center">{row.business_code}</TableCell>
                      <TableCell align="center">{row.cust_number}</TableCell>
                      <TableCell align="center">{row.clear_date}</TableCell>
                      <TableCell aligh="center">{row.buisness_year}</TableCell>
                      <TableCell align="center">{row.doc_id}</TableCell>
                      <TableCell align="center">{row.posting_date}</TableCell>
                      <TableCell align="center">{row.document_create_date}</TableCell>
                      <TableCell align="center">{row.due_in_date}</TableCell>
                      <TableCell aligh="center">{row.invoice_currency}</TableCell>
                      <TableCell align="center">{row.document_type}</TableCell>
                      <TableCell align="center">{row.posting_id}</TableCell>
                      <TableCell align="center">{row.total_open_amount}</TableCell>
                      <TableCell align="center">{row.baseline_create_date}</TableCell>
                      <TableCell aligh="center">{row.cust_payment_terms}</TableCell>
                      <TableCell aligh="center">{row.invoice_id}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (33) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Number of Rows selected */}
        {/* <EnhancedTableToolbar numSelected={selected.length} />   */}
      <Paper sx={{ width: '100%', mb: 1 }} className={classes.btm}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={search(data).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </ThemeProvider>
    <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress />
      </Backdrop>
    </>
  );
}



export default MyGrid;