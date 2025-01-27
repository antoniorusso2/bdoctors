import React from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../ui/SubmitButton";
import { api } from "../../lib/api/index";
import FormAlert from "../ui/FormAlert";

export default function CreateReviewForm({ doctorId, onReviewCreate }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    if (isSubmitting) return;

    console.log(data);
    try {
      const res = await api.post(`/doctors/${doctorId}/review`, {
        ...data,
        rating: parseInt(data.rating),
      });
      console.log(res);
      onReviewCreate({
        id: res.data,
        ...data,
        createdAt: new Date().toISOString(),
      });
      reset();
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
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
            id="first_name"
            {...register("first_name", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
          />
          {errors.first_name && (
            <div className="invalid-feedback">{errors.first_name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
            id="last_name"
            {...register("last_name", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
          />
          {errors.last_name && (
            <div className="invalid-feedback">{errors.last_name.message}</div>
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
          <label htmlFor="review_text" className="form-label">
            Review
          </label>
          <textarea
            className={`form-control ${errors.review_text ? "is-invalid" : ""}`}
            id="review_text"
            rows="4"
            {...register("review_text", {
              required: "Review text is required",
              minLength: {
                value: 10,
                message: "Review must be at least 10 characters long",
              },
            })}
          ></textarea>
          {errors.review_text && (
            <div className="invalid-feedback">{errors.review_text.message}</div>
          )}
        </div>

        <SubmitButton pending={isSubmitting}>Submit Review</SubmitButton>
      </form>
    </>
  );
}
