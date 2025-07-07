// src/services/api.js
const API_BASE_URL = 'http://localhost:3000/api';

export const apiService = {
  // Employee Management
  async getEmployees() {
    const response = await fetch(`${API_BASE_URL}/employees`);
    return await response.json();
  },

  async createEmployee(employeeData) {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    return await response.json();
  },

  async updateEmployee(employeeId, updateData) {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    return await response.json();
  },

  async deactivateEmployee(employeeId) {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
    return; // No content to parse
  }
    return await response.json();
  },

  // Project Management
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return await response.json();
  },

  async createProject(projectData) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    return await response.json();
  },

  // Task Management
  async getTasks(projectId) {
  let url = `${API_BASE_URL}/tasks`;
  if (projectId !== undefined && projectId !== '') {
    url += `?project_id=${projectId}`;
  }
  const response = await fetch(url);
  return await response.json();
},

  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response.json();
  },

  // Time Tracking
  async startTimeEntry(timeEntryData) {
    const response = await fetch(`${API_BASE_URL}/time-entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timeEntryData),
    });
    return await response.json();
  },

  async stopTimeEntry(timeEntryId, endTime) {
    const response = await fetch(`${API_BASE_URL}/time-entries/${timeEntryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ end_time: endTime }),
    });
    return await response.json();
  },

  // Screenshot Management
  async uploadScreenshot(screenshotData) {
    const formData = new FormData();
    Object.entries(screenshotData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${API_BASE_URL}/screenshots`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  },

  async getScreenshots(employeeId) {
    const response = await fetch(`${API_BASE_URL}/screenshots?employee_id=${employeeId}`);
    return await response.json();
  },
};