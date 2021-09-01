import * as React from "react";
import { useForm } from "react-hook-form";
import { useState, ChangeEvent } from "react";

type SystemOfMesure = "METRIC" | "STANDARD";

const minInches = 10;
const maxInches = 20;

const convertToCmValue = 2.54;

const inchToCm = (inch: number) => inch * convertToCmValue;

const minCentimeter = inchToCm(minInches);
const maxCentimeter = inchToCm(maxInches);

type FormInput = {
  inputLen: number;
};

export default function App() {
  const [system, setSystem] = useState<SystemOfMesure>("STANDARD");

  const [formSubmited, setFormSubmited] = useState(false);

  const toggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "METRIC") {
      setSystem("METRIC");
    } else {
      setSystem("STANDARD");
    }
  };

  const MIN = system === "METRIC" ? minCentimeter : minInches;
  const MAX = system === "METRIC" ? maxCentimeter : maxInches;
  const measurementType = system === "METRIC" ? "Centimeters" : "Inches";

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    console.log(JSON.stringify(data));
    if (errors.inputLen === undefined) {
      setFormSubmited(true);
    }
  };

  const showForm = (
    <>
      <h1>
        Enter a length between {MIN} & {MAX} {measurementType}
      </h1>
      <input
        type="radio"
        value="METRIC"
        name="system"
        checked={system === "METRIC"}
        onChange={toggle}
      />{" "}
      Metric
      <input
        type="radio"
        value="Standard"
        name="system"
        checked={system === "STANDARD"}
        onChange={toggle}
      />{" "}
      Standard
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("inputLen", {
            pattern: /^[0-9]+\.?[0-9]*$/,
            required: true,
            min: MIN,
            max: MAX
          })}
        />
        {errors.inputLen && (
          <p>
            You Must enter a number between {MIN} & {MAX}
          </p>
        )}{" "}
        <input type="submit" />
      </form>
    </>
  );

  const showSuccess = <h1>Thank you.</h1>;

  return <div>{formSubmited ? showSuccess : showForm}</div>;
}
