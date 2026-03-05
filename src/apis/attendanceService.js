import api from "./api";

export const getAttendance = (params) => {
    return api.get("/employees/attendance/", { params });
};

export const markAttendance = (data) => {
    return api.post("/employees/attendance/", data);
};

export const updateAttendance = (id, data) => {
    return api.put(`/employees/attendance/${id}/`, data);
};

export const deleteAttendance = (id) => {
    return api.delete(`/employees/attendance/${id}/`);
};

export const getAttendanceByEmployee = (employeeId, params) => {
    return api.get(`/employees/attendance/employee/${employeeId}/`, { params });
}
