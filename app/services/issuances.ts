export const getIssuances = async () => {
    const res = await fetch("/api/issuances");
    return res.json();
  };
  