import api from "./api";

export const getEmployees = (params) => {
    return api.get("/employees/employee/", { params });
};

export const createEmployee = (data) => {
    return api.post("/employees/employee/", data);
};

export const updateEmployee = (id, data) => {
    return api.put(`/employees/employee/${id}/`, data);
};

export const deleteEmployee = (id) => {
    return api.delete(`/employees/employee/${id}/`);
};
