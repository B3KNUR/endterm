const BASE_URL = "https://rickandmortyapi.com/api";

export const fetchCharacters = async ({ page = 1, name = "", perPage = 5 }) => {
  const url = `${BASE_URL}/character?page=${page}&name=${name}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      return { info: { pages: 1 }, results: [] };
    }
    throw new Error("Failed to fetch characters");
  }

  const data = await response.json();

  return {
    info: data.info,
    results: data.results.slice(0, perPage),
  };
};

export const fetchCharacterById = async (id) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {};
    }
    throw new Error("Failed to fetch characters");
  }

  return await response.json();
};
