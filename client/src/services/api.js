/**
 * Central API Client for PortfolioPro
 */

const API_BASE = '/api';

async function fetchJSON(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage = data?.message || `HTTP Error ${res.status}`;
      const err = new Error(errorMessage);
      err.status = res.status;
      err.errors = data?.errors;
      throw err;
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${endpoint}]:`, error);
    throw error;
  }
}

export const getProfile = async () => {
  const res = await fetchJSON('/profile');
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await fetchJSON('/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
  return res;
};

export const uploadProfilePhoto = async (photo) => {
  const res = await fetchJSON('/profile/photo', {
    method: 'POST',
    body: JSON.stringify({ photo }),
  });
  return res;
};

export const deleteProfilePhoto = async () => {
  const res = await fetchJSON('/profile/photo', {
    method: 'DELETE',
  });
  return res;
};

export const uploadResume = async (resumeUrl, fileName) => {
  const res = await fetchJSON('/profile/resume', {
    method: 'POST',
    body: JSON.stringify({ resumeUrl, fileName }),
  });
  return res;
};

export const getResume = async () => {
  const res = await fetchJSON('/profile/resume');
  return res.data;
};

export const deleteResume = async () => {
  const res = await fetchJSON('/profile/resume', {
    method: 'DELETE',
  });
  return res;
};

export const getSkills = async () => {
  const res = await fetchJSON('/skills');
  return res.data;
};

export const createSkill = async (skillData) => {
  const res = await fetchJSON('/skills', {
    method: 'POST',
    body: JSON.stringify(skillData),
  });
  return res;
};

export const deleteSkill = async (id) => {
  const res = await fetchJSON(`/skills/${id}`, {
    method: 'DELETE',
  });
  return res;
};

export const getProjects = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.tech) query.append('tech', params.tech);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  const res = await fetchJSON(`/projects${queryString}`);
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await fetchJSON(`/projects/${id}`);
  return res.data;
};

export const createProject = async (projectData) => {
  const res = await fetchJSON('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
  return res;
};

export const deleteProject = async (id) => {
  const res = await fetchJSON(`/projects/${id}`, {
    method: 'DELETE',
  });
  return res;
};

export const sendContactMessage = async (formData) => {
  const res = await fetchJSON('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  return res;
};
