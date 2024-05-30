const fetchHolidays = async (filter = "all") => {
  const url = "https://date.nager.at/api/v3/publicholidays/2024/FR";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const today = new Date();

    let filteredHolidays = data;
    if (filter === "next") {
      filteredHolidays = data.filter(
        (holiday) => new Date(holiday.date) >= today
      );
    } else if (filter === "past") {
      filteredHolidays = data.filter(
        (holiday) => new Date(holiday.date) < today
      );
    }

    // Séparer les jours fériés avec un retour à la ligne
    return filteredHolidays
      .map(
        (holiday) => `${holiday.date}: ${holiday.localName} (${holiday.name})`
      )
      .join("<br>");
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return "Erreur lors de la récupération des données.";
  }
};

export { fetchHolidays };
