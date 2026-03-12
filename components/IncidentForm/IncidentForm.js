// components/IncidentForm/IncidentForm.js

import styled from "styled-components";
import { useState } from "react";

export default function IncidentForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit",
  onCancel,
  cancelLabel = "Cancel",
  resetOnSuccess = false,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      await onSubmit(data);
      setShowSuccess(true);
      setSubmitError("");
      if (resetOnSuccess) {
        event.target.reset();
      }
    } catch (error) {
      setSubmitError(error?.message ?? "Submit error.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form data-js="incidentForm" onSubmit={handleSubmit}>
      {showSuccess ? (
        <SuccessMessage role="status" aria-live="polite">
          Incident successfully added.
        </SuccessMessage>
      ) : null}
      {submitError ? (
        <ErrorMessage role="alert">{submitError}</ErrorMessage>
      ) : null}
      <Field>
        <Label htmlFor="date">Date</Label>
        <Input
          name="date"
          id="date"
          required
          type="date"
          defaultValue={initialData.date ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="time">Time</Label>
        <Input
          name="time"
          id="time"
          required
          type="time"
          defaultValue={initialData.time ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="location">Location</Label>
        <Input
          name="location"
          id="location"
          required
          type="text"
          defaultValue={initialData.location ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="involvedPersons">Involved Persons</Label>
        <Input
          name="involvedPersons"
          id="involvedPersons"
          required
          type="text"
          defaultValue={initialData.involvedPersons ?? ""}
          aria-describedby="involvedPersons-hint"
        />
        <Hint id="involvedPersons-hint">
          Use initials, separate with commas (e.g., M.K., L.S.)
        </Hint>
      </Field>

      <Field>
        <Label htmlFor="witnesses">Witnesses (optional)</Label>
        <Input
          name="witnesses"
          id="witnesses"
          type="text"
          defaultValue={initialData.witnesses ?? ""}
          aria-describedby="witnesses-hint"
        />
        <Hint id="witnesses-hint">
          Use initials, or descriptions, separate with commas (e.g., T.W.,
          teacher, unknown students)
        </Hint>
      </Field>

      <Field>
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          id="category"
          required
          defaultValue={initialData.category ?? ""}
        >
          <option value="" disabled>
            Please select a category
          </option>
          <option value="verbal">Verbal</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
          <option value="discrimination">Discrimination</option>
          <option value="other">Other</option>
        </Select>
      </Field>

      <Field>
        <Label htmlFor="severity">Severity</Label>
        <Select
          name="severity"
          id="severity"
          required
          defaultValue={initialData.severity ?? ""}
        >
          <option value="" disabled>
            Please select severity
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </Select>
      </Field>

      <Field>
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          required
          minLength={10}
          defaultValue={initialData.description ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="impact">Impact (optional)</Label>
        <Textarea
          name="impact"
          id="impact"
          defaultValue={initialData.impact ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="reportedTo">Reported To (optional)</Label>
        <Input
          name="reportedTo"
          id="reportedTo"
          type="text"
          defaultValue={initialData.reportedTo ?? ""}
        />
      </Field>

      <Field>
        <Label htmlFor="followUp">Follow Up (optional)</Label>
        <Textarea
          name="followUp"
          id="followUp"
          defaultValue={initialData.followUp ?? ""}
        />
      </Field>

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>

      {onCancel && (
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          aria-label="Cancel"
        >
          {cancelLabel}
        </Button>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 1rem;
`;

const Input = styled.input`
  font-family: var(--font-family);
  font-size: 1rem;
  padding: 8px;
`;

const Textarea = styled.textarea`
  font-size: 1rem;
  padding: 8px;
`;

const Select = styled.select`
  font-size: 1rem;
  padding: 8px;
`;

const Button = styled.button`
  font-size: 1rem;
  padding: 10px;
  background-color: var(--color-primary);
  border: none;
  cursor: pointer;
`;

const Hint = styled.p`
  font-size: 0.8rem;
  color: var(--color-accent);
  margin: 0;
`;

const SuccessMessage = styled.p`
  color: var(--color-success);
  background-color: var(--color-success-bg);
  padding: 8px 12px;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: var(--color-error);
  background-color: var(--color-error-bg);
  padding: 8px 12px;
  border-radius: 4px;
`;
