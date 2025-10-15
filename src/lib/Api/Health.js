import api from "../services"

export const Health = async (page = 1, search = "") => {
  const params = new URLSearchParams();
  

  // tambahkan page
  params.append("page", page);

  // tambahkan search jika ada
  if (search) {
    params.append("search", search);

  }

  const response = await api.get(`agent?${params.toString()}`);
  return response.data;
};


