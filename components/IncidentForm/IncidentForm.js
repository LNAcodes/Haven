// components/IncidentForm/IncidentForm.js

import styled from "styled-components";
import { useState } from "react";
import Message from "@/components/ui/Message";
import Button from "@/components/ui/Button";

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
    setIsSubmitting(true);

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
    <PageContainer>
      <Form data-js="incidentForm" onSubmit={handleSubmit}>
        {showSuccess ? (
          <Message
            type="success"
            dismissible
            onClose={() => setShowSuccess(false)}
          >
            Saved! You did it. 💙
          </Message>
        ) : null}

        {submitError ? (
          <Message type="error" dismissible onClose={() => setSubmitError("")}>
            {submitError}
          </Message>
        ) : null}

        <Field>
          <Label htmlFor="date">
            Date <Required>*</Required>
          </Label>
          <Input
            name="date"
            id="date"
            required
            type="date"
            defaultValue={initialData.date ?? ""}
          />
        </Field>

        <Field>
          <Label htmlFor="time">
            Time <Required>*</Required>
          </Label>
          <Input
            name="time"
            id="time"
            required
            type="time"
            step="60"
            pattern="[0-9]{2}:[0-9]{2}"
            defaultValue={initialData.time ?? ""}
          />
        </Field>

        <Field>
          <Label htmlFor="location">
            Location <Required>*</Required>
          </Label>
          <Input
            name="location"
            id="location"
            required
            type="text"
            placeholder="e.g. classroom, schoolyard, bus"
            defaultValue={initialData.location ?? ""}
          />
        </Field>

        <Field>
          <Label htmlFor="involvedPersons">
            Involved Persons <Required>*</Required>
          </Label>
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
          <Label htmlFor="category">
            Category <Required>*</Required>
          </Label>
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
          <Label htmlFor="severity">
            Severity <Required>*</Required>
          </Label>
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

        <LegendContainer>
          <LegendItem>
            <LegendDot $severity="low" />
            <LegendText>Low — Minor incidents</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot $severity="medium" />
            <LegendText>Medium — Concerning incidents</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot $severity="high" />
            <LegendText>High — Serious incidents</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendDot $severity="critical" />
            <LegendText>Critical — Very serious incidents</LegendText>
          </LegendItem>
        </LegendContainer>

        <Field>
          <Label htmlFor="description">
            Description <Required>*</Required>
          </Label>
          <Textarea
            name="description"
            id="description"
            required
            minLength={10}
            placeholder="Describe what happened (min. 10 characters)"
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

        <Button type="submit" disabled={isSubmitting} fullWidth>
          {submitLabel}
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="back"
            onClick={onCancel}
            disabled={isSubmitting}
            aria-label="Cancel"
            fullWidth
          >
            {cancelLabel}
          </Button>
        )}
      </Form>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.label`
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
`;

const Required = styled.span`
  color: var(--color-error);
`;

const Input = styled.input`
  font-family: var(--font-family);
  font-size: 1rem;
  padding: 8px 12px;
  min-height: 48px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-text);
  background-color: var(--color-background);
  width: 100%;
  box-sizing: border-box;
  &:user-invalid {
    border-color: var(--color-error);
  }
`;

const Textarea = styled.textarea`
  font-family: var(--font-family);
  font-size: 1rem;
  padding: 8px 12px;
  min-height: 80px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-text);
  background-color: var(--color-background);
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  &:user-invalid {
    border-color: var(--color-error);
  }
`;

const Select = styled.select`
  font-family: var(--font-family);
  font-size: 1rem;
  padding: 8px 12px;
  min-height: 48px;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  color: var(--color-text);
  background-color: var(--color-background);
  width: 100%;
  box-sizing: border-box;
  &:user-invalid {
    border-color: var(--color-error);
  }
`;

const Hint = styled.p`
  font-family: var(--font-family);
  font-size: 0.8rem;
  color: var(--color-accent);
  margin: 0;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  background-color: ${({ $severity }) => {
    if ($severity === "low") return "var(--color-severity-low)";
    if ($severity === "medium") return "var(--color-severity-medium)";
    if ($severity === "high") return "var(--color-severity-high)";
    if ($severity === "critical") return "var(--color-severity-critical)";
  }};
`;

const LegendText = styled.span`
  font-family: var(--font-family);
  font-size: 0.8rem;
  color: var(--color-text);
`;
