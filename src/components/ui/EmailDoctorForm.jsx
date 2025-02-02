import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import FormAlert from "./FormAlert";
import SubmitButton from "./SubmitButton";

export default function EmailDoctorForm({ doctorEmail }) {
  const [contact_number, setContactNumber] = useState(300);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    setContactNumber(contact_number + 1);

    if (isSubmitting) return;

    try {
      await emailjs.send(
        "service_9wahn1u",
        "template_5o9yx0b",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_email: doctorEmail,
          user_email: data.email,
          contact_number,
        },
        "jSbVF3bdzo-82l7Jv"
      );
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <FormAlert success={isSubmitSuccessful} error={errors.root} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Inserisci il tuo nome
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Inserisci la tua e-mail
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Scrivi il tuo messaggio
          </label>
          <textarea
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            id="message"
            rows="4"
            {...register("message", { required: "Message is required" })}
          ></textarea>
          {errors.message && (
            <div className="invalid-feedback">{errors.message.message}</div>
          )}
        </div>

        <SubmitButton pending={isSubmitting}>Invia e-mail</SubmitButton>
      </form>
    </>
  );
}
