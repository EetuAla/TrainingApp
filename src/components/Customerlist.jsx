import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Container from "@mui/material/Container";


function CustomerList() {
    const [customers, setCustomers] = useState([])

    const [columnDefs] = useState([
        {field: "firstname", sortable: true, filter: true},
        {field: "lastname", sortable: true, filter: true},
        {field: "streetaddress", sortable: true, filter: true},
        {field: "postcode", sortable: true, filter: true},
        {field: "city", sortable: true, filter: true},
        {field: "email", sortable: true, filter: true},
        {field: "phone", sortable: true, filter: true},
    ]);
    useEffect(() => {
        fetchCustomers();
      }, []);

    const fetchCustomers = () => {
        fetch("https://traineeapp.azurewebsites.net/api/customers")
         .then((response) => {
            if(!response.ok)
                throw new Error("Something went wrong: " + response.statusText);

            return response.json();
         })
         .then((data) => setCustomers(data.content))
         .catch((err) => console.error(err));
    }

    return (
      <>
      <Container maxWidth="xl">
        <div className = "ag-theme-material" style = {{width: "100%", height: 600}}>
        <AgGridReact 
            rowData= {customers}
            columnDefs= {columnDefs}
            pagination={true}
            paginationAutoPageSize={true}
        />
      </div>
      </Container>
      </>
    )
  }
  
  export default CustomerList