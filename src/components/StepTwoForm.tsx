import React, { useEffect, useState } from "react";
import { Button, MenuItem } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import UI, { PLACE_HOLDERS } from "../ui";
import { useDispatch } from "react-redux";
import { showSnackBar } from "../redux/snackBarSlice";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Autocomplete, TextField } from "@mui/material";
import { STATE_LIST } from "../constants/stateListName";

interface StepTwoFormProps {
  onSubmit: SubmitHandler<StepTwoFormData>;
}

interface StepTwoFormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: string;
}

const schema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.string().matches(/^\d+$/, "Invalid pincode").optional(),
});

const StepTwoForm: React.FC<StepTwoFormProps> = ({ onSubmit }) => {
  const [countryList, setCountryList] = useState([]);
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const methods = useForm<StepTwoFormData>({
    resolver: yupResolver(schema) as any,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const handleOnChangeState = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);

        if (response) {
          setCountryList(response.data);
        }
      } catch (error) {
        dispatch(
          showSnackBar({
            setopen: true,
            message: error?.msg,
            severity: "error",
          })
        );
      }
    };

    fetchData();
  }, []);

  const handleCountryInputChange = async (
    event: React.ChangeEvent<{}>,
    value: string
  ) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${value}`
      );

      if (response) {
        setCountryList(response.data);
      }
    } catch (error) {
      dispatch(
        showSnackBar({
          setopen: true,
          message: error?.msg,
          severity: "error",
        })
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="p-3">
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="address" className="span-together">
            {UI.ADDRESS}

            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="address"
                  type="text"
                  name="address"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Address'
                  )}
                  variant="outlined"
                  className="form-control"
                  error={!!errors.address}
                  style={{ maxWidth: "550px" }}
                  onChange={(e) => methods.setValue("address", e.target.value)}
                  helperText={errors.address?.message}
                />
              )}
            />
          </div>
        </div>
        <div
          className="field_space"
          style={{ textAlign: "right", paddingRight: "2%" }}
        >
          {errors.address && (
            <span className="mandatory">{errors.address.message}</span>
          )}
        </div>
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="state" className="span-together">
            {UI.STATE}

            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select
                  labelId="state"
                  id="state"
                  fullWidth
                  value={state}
                  onChange={(e) => {
                    handleOnChangeState(e);
                    setValue("state", e.target.value);
                  }}
                  style={{ width: "550px" }}
                  error={!!errors.state}
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'State'
                  )}
                >
                  {STATE_LIST.map((eachItem) => (
                    <MenuItem value={eachItem.name} id={eachItem.name}>
                      {eachItem.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
        <div
          className="field_space"
          style={{ textAlign: "right", paddingRight: "2%" }}
        >
          {errors.state && (
            <span className="mandatory">{errors.state.message}</span>
          )}
        </div>
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="city" className="span-together">
            {UI.CITY}

            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="city"
                  type="text"
                  name="city"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'City'
                  )}
                  variant="outlined"
                  className="form-control"
                  error={!!errors.city}
                  style={{ maxWidth: "550px" }}
                  onChange={(e) => methods.setValue("city", e.target.value)}
                  helperText={errors.city?.message}
                />
              )}
            />
          </div>
        </div>
        <div
          className="field_space"
          style={{ textAlign: "right", paddingRight: "2%" }}
        >
          {errors.city && (
            <span className="mandatory">{errors.city.message}</span>
          )}
        </div>
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="country" className="span-together">
            {UI.COUNTRY}

            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Autocomplete
              disablePortal
              id="country"
              options={countryList}
              getOptionLabel={(option: any) => option.name.common}
              
              onChange={(event, value: any) => {
                const selectedCountry = value?.name?.common || "";
                setValue("country", selectedCountry);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="country"
                  id="country"
                  onChange={(e) => {
                    handleCountryInputChange(e, e.target.value);
                  }}
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Country'
                  )}
                  sx={{maxWidth:550}}
                />
              )}
            />
          </div>
        </div>
        <div
          className="field_space"
          style={{ textAlign: "right", paddingRight: "2%" }}
        >
          {errors.country && (
            <span className="mandatory">{errors.country.message}</span>
          )}
        </div>
        <div className="mt-2 ms-2 me-2">
          <label htmlFor="pincode" className="span-together">
            {UI.PINCODE}

            <span className="m-0">:</span>
          </label>
          <div className="d-flex justify-content-center w-100">
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder={`${PLACE_HOLDERS.PLEASE_ENTER}`.replace(
                    '%s',
                    'Pincode'
                  )}
                  variant="outlined"
                  className="form-control"
                  error={!!errors.pincode}
                  style={{ maxWidth: "550px" }}
                  onChange={(e) => methods.setValue("pincode", e.target.value)}
                  helperText={errors.pincode?.message}
                />
              )}
            />
          </div>
        </div>
        <div
          className="field_space"
          style={{ textAlign: "right", paddingRight: "2%" }}
        >
          {errors.pincode && (
            <span className="mandatory">{errors.pincode.message}</span>
          )}
        </div>
        <div className="ms-2 mt-2">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            {UI.SUBMIT}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default StepTwoForm;
