import React, { useState } from "react";
import {  Tabs, Tab } from "@material-ui/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import StepTwoForm from "./StepTwoForm";
import StepOneForm from "./StepOneForm";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData
} from "../redux/userSlice";
import store from "../redux/store";
import { Card } from "@mui/material";

interface StepOneFormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
}

interface StepTwoFormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}
type RootState = ReturnType<typeof store.getState>;

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneData, setStepOneData] = useState<StepOneFormData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoFormData | null>(null);
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userInfo.data);

  const handleStep1Submit = (data: StepOneFormData) => {
    setStepOneData(data);
    setActiveStep(1);
  };

  const handleStep2Submit = (data: StepTwoFormData) => {
    setStepTwoData(data);
    
    if (Object.values(data).some(value => value !== undefined && value !== "")) {
      const bothFormData = { ...stepOneData, ...data };
      dispatch(updateFormData(bothFormData));
    }
  
    setStepOneData(null);
    setActiveStep(0);
  };
  

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 160, sortable: false, },
    { field: "name", headerName: "Name", width: 160, sortable: false, },
    {
      field: "sex",
      headerName: "Sex",
      type: "text",
      width: 90,
      sortable: false,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 90,
      sortable: false,
    },
    {
      field: "idType",
      headerName: "Govt Id",
      description: "This column is about the Goverment Id Proof ",
      sortable: false,
      width: 160,
    },
    {
      field: "idNumber",
      headerName: "Govt Id Number",
      description: "This column is about the Goverment Id Proof Number ",
      sortable: false,
      width: 160,
    },

    {
      field: "address",
      headerName: "Address",
      description: "This column is about the address of user",
      sortable: false,
      width: 160,
    },
    {
      field: "state",
      headerName: "State",
      sortable: false,
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      sortable: false,
      width: 160,
    },
    {
      field: "country",
      headerName: "Country",
      sortable: false,
      width: 160,
    },
    {
      field: "pincode",
      headerName: "PinCode",
      sortable: false,
      width: 160,
    },
  ];

  const rows = userData;

  return (
    <div className="container m-auto ps-10 mt-10 ">
      <span className="text-xl font-bold ">Onito Technologies</span>
      <Tabs
        value={activeStep}
        onChange={(event, newValue) => setActiveStep(newValue)}
        indicatorColor="primary"
      >
        <Tab label="Step 1" />
        <Tab label="Step 2" />
      </Tabs>
      <div className="form-container">
        <Card
          className="mx-2 pt-2 pb-2 mt-2 form-card"
          sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}
        >
          {activeStep === 0 && <StepOneForm onNext={handleStep1Submit} stepOneData={stepOneData}/>}
          {activeStep === 1 && <StepTwoForm onSubmit={handleStep2Submit} />}
        </Card>

        <div className="datagrid-container">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            hideFooter
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
