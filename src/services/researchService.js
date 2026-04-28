import API from "./api";

// GET ALL
export const getAllResources = () => API.get("/research");

// GET FILTER
export const getByDomainAndType = (domain, type) =>
  API.get(`/research/domain/${domain}/type/${type}`);

// CREATE
export const addResource = (data) =>
  API.post("/research", data);

// UPDATE
export const updateResource = (id, data) =>
  API.put(`/research/${id}`, data);

// DELETE
export const deleteResource = (id) =>
  API.delete(`/research/${id}`);

export const getUserResources = () =>
  API.get("/research/user");
