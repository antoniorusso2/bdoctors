import React from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../ui/SubmitButton";
import { api } from "../../lib/api/index";
import FormAlert from "../ui/FormAlert";

export default function CreateReviewForm({ doctorId }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm();

  async function onSubmit(data) {
    if (isSubmitting) return;

    console.log(data);
    try {
      const res = await api.post("/reviews", {
        ...data,
        rating: parseInt(rating),
        doctorId,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      setError("root", {
        message:
          err.response?.data?.message ||
          "Errore nell'invio della recensione, riprovare più tardi",
      });
    }
  }

  return (
    <>
      <FormAlert success={isSubmitSuccessful} error={errors.root} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
                value: 2,
                message: "First name must be at least 2 characters",
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
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating
          </label>
          <select
            className={`form-select ${errors.rating ? "is-invalid" : ""}`}
            id="rating"
            {...register("rating", {
              required: "Rating is required",
              min: {
                value: 1,
                message: "Rating must be between 1 and 5",
              },
              max: {
                value: 5,
                message: "Rating must be between 1 and 5",
              },
            })}
          >
            <option value="">Seleziona un punteggio</option>
            <option value="1">1 - Scarso</option>
            <option value="2">2 - Discreto</option>
            <option value="3">3 - Buono</option>
            <option value="4">4 - Molto buono</option>
            <option value="5">5 - Eccellente</option>
          </select>
          {errors.rating && (
            <div className="invalid-feedback">{errors.rating.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="reviewText" className="form-label">
            Review
          </label>
          <textarea
            className={`form-control ${errors.reviewText ? "is-invalid" : ""}`}
            id="reviewText"
            rows="4"
            {...register("reviewText", {
              required: "Review text is required",
              minLength: {
                value: 10,
                message: "Review must be at least 10 characters long",
              },
            })}
          ></textarea>
          {errors.reviewText && (
            <div className="invalid-feedback">{errors.reviewText.message}</div>
          )}
        </div>

        <SubmitButton pending={isSubmitting}>Submit Review</SubmitButton>
      </form>
    </>
  );
}
