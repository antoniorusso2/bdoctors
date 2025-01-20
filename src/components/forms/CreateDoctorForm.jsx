import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import SubmitButton from "../ui/SubmitButton";
import { api } from "../../lib/api/index";
import { useNavigate } from "react-router-dom";

const specializations = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
];

export default function CreateDoctorForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm();

  async function onSubmit(data) {
    if (isSubmitting) return;

    console.log(data);
    try {
      const res = await api.post("/doctors", {
        ...data,
        specializations: data.specializations.map((s) => s.id),
      });
      console.log(res);
      navigate(`/doctors/${res.data}`);
    } catch (err) {
      console.error(err);
      setError("root", {
        message:
          err.response?.data?.message ||
          "Errore nell'invio del form, riprovare piu tardi",
      });
    }
  }

  return (
    <>
      <FormAlert success={isSubmitSuccessful} error={errors.root} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "The entered email is not valid",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            id="firstName"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters",
              },
            })}
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters",
              },
            })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\+?\d{10,}$/,
                message:
                  "Phone number must contain only digits and optionally start with '+'",
              },
            })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="specializations" className="form-label">
            Specializations
          </label>
          <Controller
            name="specializations"
            control={control}
            rules={{ required: "Please select at least one specialization" }}
            render={({ field }) => (
              <Select
                {...field}
                options={specializations}
                isMulti
                closeMenuOnSelect={false}
                className={errors.specializations ? "is-invalid" : ""}
              />
            )}
          />
          {errors.specializations && (
            <div className="invalid-feedback">
              {errors.specializations.message}
            </div>
          )}
        </div>

        <SubmitButton pending={isSubmitting}>Add Doctor</SubmitButton>
      </form>
    </>
  );
}
