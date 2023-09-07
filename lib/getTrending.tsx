export const getTrending = async (type:string) => {
    const res = await fetch(`/trending?type=${type}`, {  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data , status: " + res.status);
    }
    return res.json();
  }