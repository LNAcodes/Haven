export function parseIncidentFields(body) {
  const { involvedPersons, witnesses, ...rest } = body;
  return {
    ...rest,
    involvedPersons: involvedPersons.split(",").map((p) => p.trim()),
    witnesses: witnesses ? witnesses.split(",").map((w) => w.trim()) : [],
  };
}
