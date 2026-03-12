// components/IncidentForm/IncidentForm.js

import styled from "styled-components";
import { useState } from "react";

export default function IncidentForm() {
  IncidentForm({
    initialData = {}, onSubmit, submitLabel = "Submit", onCancel, cancelLabel = "Cancel"
  }) {

    const { data: incidents } = useSWR("/api/incidents");
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionFocused, setCollectionFocused] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

    async function handleSubmit(event) {event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

   try {
      await onSubmit(data);

      setShowSuccess(true);
     if (resetOnSuccess) {
        event.target.reset();
      }
    } catch (error) {
      setSubmitError(error?.message ?? "Submit error.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return <Form data-js="incidentForm" onSubmit={handleSubmit}>
      {showSuccess ? (
        <SuccessMessage role="status" aria-live="polite">
          Incident successfully added.
        </SuccessMessage>
      ) : null}
    <Input
    name="date"
    id = "date"
    required
    type="date"   />
    <input type="time" name="time" required />
<input type="text" name="location" required />
<input type="text" name="involvedPersons" required />
<input type="text" name="witnesses" /> (optional)
<select name="category" required></select>
<select name="severity" required></select>
<textarea name="description" required minLength={10} />
<textarea name="impact" /> (optional)
<input type="text" name="reportedTo" /> (optional)
<textarea name="followUp" /> (optional)
  <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>

      {onCancel ? (
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancel editing"
        >
          {cancelLabel}
        </Button>
      ) : null}
  </Form>;
}

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input``;

const Button = styled.button ``;

// InvolvedPersons: Add hint text below: "Use initials, separate with commas (e.g., M.K., L.S.)"
