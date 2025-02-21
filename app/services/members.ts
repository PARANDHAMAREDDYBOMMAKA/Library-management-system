export const getMembers = async () => {
    const res = await fetch("/api/members");
    return res.json();
  };
  