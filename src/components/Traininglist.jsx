import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import Container from "@mui/material/Container";




function TrainingList() {
  const [training, setTraining] = useState([]);

  const [columnDefs] = useState([
    {
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        const formattedDate = dayjs(params.value).format("DD.MM.YYYY HH:mm");
        return formattedDate;
      },
    },
    { field: "duration", sortable: true, filter: true },
    { field: "activity", sortable: true, filter: true },
    {
      field: "customer",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return (
          params.data.customer.firstname + " " + params.data.customer.lastname
        );
      },
    },
  ]);
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/api/trainings")
      .then((response) => {
        if (!response.ok)
          throw new Error("Something went wrong: " + response.statusText);

        return response.json();
      })
      .then((data) => {
        const trainingWithCustomerDetails = data.content.map(
          async (training) => {
            const customerLink = training.links.find((link) => link.rel === "customer").href;
            const customerResponse = await fetch(customerLink);
            const customerData = await customerResponse.json();
            return { ...training, customer: customerData };
          }
        );
        Promise.all(trainingWithCustomerDetails)
          .then((trainingsWithCustomers) => setTraining(trainingsWithCustomers))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Container maxWidth="xl">
        <div className="ag-theme-material" style={{ width: "100%", height: 600 }}>
        <AgGridReact
          rowData={training}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
      </Container>
    </>
  );
}

export default TrainingList;
