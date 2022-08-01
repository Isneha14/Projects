import axios from 'axios';

export const getData = async() =>{
    let response = await axios.get("http://localhost:8080/backend/DataLoading");
    let data =  response.data.data;
    data.map((rows, index) => ({ ...rows, "id": index}))
    return data;
}

export const addValue = async ({business_code, cust_number, clear_date, buisness_year, doc_id, 
    posting_date, document_create_date, due_in_date, invoice_currency, document_type,
    posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id}) =>{

    let data = "business_code=" + business_code + "&cust_number=" + cust_number + "&clear_date=" + 
                clear_date + "&buisness_year=" + buisness_year + "&doc_id=" + doc_id + "&posting_date=" + 
                posting_date + "&document_create_date=" + document_create_date + "&due_in_date=" + 
                due_in_date + "&invoice_currency=" + invoice_currency + "&document_type=" + document_type + 
                "&posting_id=" + posting_id + "&total_open_amount=" + total_open_amount +
                "&baseline_create_date=" + baseline_create_date + "&cust_payment_terms=" + 
                cust_payment_terms + "&invoice_id=" + invoice_id;
    
    let response = await axios.get("http://localhost:8080/backend/AddValue?" + data);
    return response.data;
}

export const updateValue = async ({sl_no, invoice_currency, cust_payment_terms,aging_bucket}) => {
    
    let d = "sl_no=" + sl_no + "&invoice_currency=" + invoice_currency + "&cust_payment_terms=" + 
                cust_payment_terms+"&aging_bucket="+aging_bucket ;
                
    let res = await axios.get("http://localhost:8080/backend/UpdateValue?" + d);
    return res.d;
}
export const deleteValue = async ({sl_no}) => {
    let data = "sl_no=" + sl_no;
    let response = await axios.get("http://localhost:8080/backend/DeleteValue?" + data);
    return response.data;
}

