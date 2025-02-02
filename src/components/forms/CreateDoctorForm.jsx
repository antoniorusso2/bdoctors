import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import SubmitButton from "../ui/SubmitButton";
import { api } from "../../lib/api/index";
import { useNavigate } from "react-router-dom";
import FormAlert from "../ui/FormAlert";
import SelectSpecializations from "../ui/SelectSpecializations";
import AddressAutocomplete from "../ui/AddressAutocomplete";

export default function CreateDoctorForm() {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    getValues,
  } = useForm();

  async function onSubmit(data) {
    if (isSubmitting) return;

    try {
      const res = await api.post("/doctors", {
        ...data,
        specializationsIds: data.specializations.map(({ value }) => value),
      });

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
          <label htmlFor="specializations" className="form-label">
            Specializzazioni
          </label>
          <Controller
            name="specializations"
            control={control}
            rules={{ required: "Seleziona almeno una specializzazione" }}
            render={({ field }) => (
              <SelectSpecializations
                {...field}
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

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            {...register("email", {
              required: "L'email e' obbligatoria",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email non invalida",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
            id="first_name"
            {...register("first_name", {
              required: "Il nome e' obbligatorio",
              minLength: {
                value: 3,
                message: "Il nome deve avere almeno 3 caratteri",
              },
            })}
          />
          {errors.first_name && (
            <div className="invalid-feedback">{errors.first_name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            id="last_name"
            {...register("last_name", {
              required: "Il cognome e' obbligatorio",
              minLength: {
                value: 3,
                message: "Il cognome deve avere almeno 3 caratteri",
              },
            })}
          />
          {errors.last_name && (
            <div className="invalid-feedback">{errors.last_name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Telefono
          </label>
          <input
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            {...register("phone", {
              required: "Numero di telefono obbligatorio",
              pattern: {
                value: /^\+?\d{10,15}$/,
                message: "Il numero di telefono deve contenere solo numeri",
              },
              maxLength: {
                value: 15,
                message: "Il numero di telefono deve avere almeno 15 caratteri",
              },
            })}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone.message}</div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="address" className="form-label">
            Indirizzo
          </label>
          <AddressAutocomplete
            control={control}
            defaultAddress={getValues("address") || ""}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        <SubmitButton pending={isSubmitting}>Crea il tuo profilo</SubmitButton>
      </form>
    </>
  );
}
