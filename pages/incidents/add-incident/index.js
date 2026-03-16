// pages/incidents/add-incident/index.js

import IncidentForm from "@/components/IncidentForm/IncidentForm";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function AddIncident() {
  const { mutate, data: incidents } = useSWR("/api/incidents");
  const router = useRouter();

  async function handleAddIncident(incidentData) {
    const newIncident = { ...incidentData, _id: crypto.randomUUID() };
    mutate([newIncident, ...(incidents || [])], false);
    const result = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incidentData),
    });

    if (!result.ok) {
      await result.json();
      throw new Error("Could not save new incident.");
    }
    await mutate();
    setTimeout(() => router.push("/"), 2500);
  }
  return (
    <>
      <IncidentForm
        submitLabel="Submit"
        onSubmit={handleAddIncident}
        cancelLabel="Cancel"
        onCancel={() => router.push("/")}
        resetOnSuccess
      />
    </>
  );
}
