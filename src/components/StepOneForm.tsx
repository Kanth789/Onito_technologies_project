import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@material-ui/core";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import UI, { PLACE_HOLDERS } from "../ui";
import { FormHelperText } from "@mui/material";
import VALIDATION_VALUES from "../validationValues";
import ERROR_MSG from "../errorMsg";
import useWindowSize from "../constants/windowSize";
import { SMALL_MOBILE_SCREEN_WIDTH } from "../constants/mediaBreakPoints";

interface StepOneFormData {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  idType: string;
  idNumber: string;
}


interface StepOneFormProps {
  onNext: (data: StepOneFormData) => void;
  stepOneData?: StepOneFormData | null;
}


const schema = yup.object().shape({
  name: yup
    .string()
    .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
      '%s',
      'Name'
    ))
    .min(1, "Name must be at least 3 characters"),
  age: yup
    .number()
    .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
      '%s',
      'Age'
    ))
    .positive("Age must be a positive integer")
    .min(
      VALIDATION_VALUES.MIN_VALUE,
      "Invalid Age "
    )
    .max(200,"Please Enter A Valid Age"),
  sex: yup
    .string()
    .oneOf(["Male", "Female"], "Invalid sex")
    .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
      '%s',
      'Sex'
    )),
  mobile: yup
    .string()
    .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
      '%s',
      'Mobile'
    ))
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number"),
  idType: yup
    .string()
    .oneOf(["Aadhar card", "Pan"], "Invalid ID Type")
    .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
      '%s',
      'Govt Id '
    )),
  idNumber: yup.string().when("idType", {
    is: UI.GOVT_ID.AADHAR_CARD,
    then: yup
      .string()
      .required(`${ERROR_MSG.FIELD_IS_REQUIRED}`.replace(
        '%s',
        'Aadhar number'
      ))
      .min(
        VALIDATION_VALUES.MIN_VALUE,
        "Invalid Aadhar number"
      )
      .max(
        12,
        "Invalid Aadhar number"
      ),
    otherwise: yup
      .string()
      .required("PAN number is required")
      .matches(/^[A-Z0-9]{10}$/, "Invalid PAN number"),
  }),
});

const StepOneForm: React.FC<StepOneFormProps> = ({ onNext,stepOneData }) => {
  const [govtId, setGovtId] = useState(stepOneData?.idType || "None");
  const [gender, setGender] = useState(stepOneData?.sex || "None");
  const {width} = useWindowSize()

  

  const handleChange = (event: SelectChangeEvent) => {
    setGovtId(event.target.value);
  };
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };
  const methods = useForm<StepOneFormData>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
    defaultValues: stepOneData || undefined,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = methods;

  useEffect(() => {
    if (stepOneData) {
      reset(stepOneData);
    }
  }, [reset, stepOneData]);


  const onSubmit: SubmitHandler<StepOneFormData> = (data) => {
    onNext(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="p-3 ">
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="name" className="span-together">
            <span>{UI.NAME}</span>
            <Box component="span" style={{ color: "#d32f2f" }}>
              *
            </Box>
            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="name"
                  type="text"
                  name="name"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Name'
                  )}
                  variant="outlined"
                  className="form-control"
                  error={!!errors.name}
                  style={{ maxWidth: "550px" }}
                  helperText={errors.name?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="d-flex flex-column  mt-2 ms-2 me-2">
          <label htmlFor="age" className="span-together">
            <div>
              {UI.AGE}
              <Box component="span" style={{ color: "#d32f2f" }}>
                *
              </Box>
              <span className="m-0">:</span>
            </div>
          </label>
          <div className="d-flex justify-content-center w-100 ">
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="age"
                  type="number"
                  name="age"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Age'
                  )}
                  variant="outlined"
                  className="form-control "
                  error={!!errors.age}
                  style={{ maxWidth: "550px" }}
                  helperText={errors.age?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="d-flex flex-column  mt-2 ms-2 me-2">
          <label htmlFor="sex" className="span-together">
            {UI.SEX}
            <Box component="span" style={{ color: "#d32f2f" }}>
              *
            </Box>
            <span className="m-0">:</span>
          </label>
          <div className="w-100">
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <Select
                fullWidth
                  labelId="sex"
                  id="sex"
                  value={gender}
                  onChange={(e) => {
                    handleGenderChange(e);
                    setValue("sex", e.target.value);
                    setGender(e.target.value);
                  }}
                  style={{ maxWidth: "550px" }}
                  error={!!errors.sex}
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Gender'
                  )}
                >
                  <MenuItem value="None" id="">
                    <em>{UI.NONE}</em>
                  </MenuItem>
                  <MenuItem value="Male" id="Male">
                    {UI.MALE}
                  </MenuItem>
                  <MenuItem value="Female" id="Female">
                    {UI.FEMALE}
                  </MenuItem>
                </Select>
              )}
            />
            {errors.sex && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                {UI.REQUIRED}
              </FormHelperText>
            )}
          </div>
        </div>

        <div className="d-flex flex-column  mt-2 ms-2 me-2">
          <label htmlFor="mobile" className="span-together">
            {UI.MOBILE}
            <Box component="span" style={{ color: "#d32f2f" }}>
              *
            </Box>
            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100 no_spinner">
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="mobile"
                  type="number"
                  name="mobile"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Mobile'
                  )}
                  variant="outlined"
                  className="form-control"
                  error={!!errors.mobile}
                  style={{ maxWidth: "550px" }}
                  helperText={errors.mobile?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="d-flex  mt-2 ms-2 me-2">
          <label htmlFor="idType" className="span-together">
            <div className="d-flex align-items-center">
              <span>{UI.GOVERMENT_ID}</span>
              <Box component="span" style={{ color: "#d32f2f" }}>
                *
              </Box>
              <span className="m-0">:</span>
            </div>
          </label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="d-flex justify-content-center w-100 ">
              <Controller
                name="idType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    fullWidth
                    labelId="idType"
                    id="idType"
                    value={govtId}
                    onChange={(e) => {
                      handleChange(e);
                      setValue("idType", e.target.value);
                      setGovtId(e.target.value);
                    }}
                    sx={{ width: "150px" }}
                    error={!!errors.idType}
                    
                  >
                    <MenuItem value="None" id="idType">
                      <em>{UI.NONE}</em>
                    </MenuItem>
                    <MenuItem value={UI.GOVT_ID.AADHAR_CARD} id="idType">
                      {UI.GOVT_ID.AADHAR_CARD}
                    </MenuItem>
                    <MenuItem value={UI.GOVT_ID.PAN} id="idType">
                      {UI.GOVT_ID.PAN}
                    </MenuItem>
                  </Select>
                )}
              />

              {errors.idType && (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {UI.REQUIRED}
                </FormHelperText>
              )}
            </div>
            <div className="d-flex  w-100 ms-2 ">
              <Controller
                name="idNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    id="idNumber"
                    type="text"
                    name="idNumber"
                    placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                      '%s',
                      'GovtId Number'
                    )}
                    variant="outlined"
                    className={`form-control`}
                    error={!!errors.idNumber}
                    style={{ width: width && width > SMALL_MOBILE_SCREEN_WIDTH ? "390px" : undefined }}
                    helperText={errors.idNumber?.message}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className=" mt-2 ms-2 me-2 ">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {UI.NEXT}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default StepOneForm;
