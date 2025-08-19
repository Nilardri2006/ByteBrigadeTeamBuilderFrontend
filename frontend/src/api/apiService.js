const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  async createProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          linkedin_url: profileData.linkedin || null,
          github_url: profileData.github || null,
          gender: profileData.gender || null,
          known_skills: profileData.knownSkills || [],
          desired_skills: profileData.desiredSkills || [],
          is_beginner: profileData.isBeginner || false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create profile');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async searchProfiles(searchCriteria) {
    try {
      const skillsQuery = searchCriteria.requiredSkills.join(',');
      const queryParams = new URLSearchParams({
        ...(skillsQuery && { skills: skillsQuery }),
        include_beginner: searchCriteria.includeBeginner.toString(),
        team_size: searchCriteria.teamSize.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/users/search?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to search profiles');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async getAllProfiles(skip = 0, limit = 100) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/?skip=${skip}&limit=${limit}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch profiles');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`http://localhost:8000/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export default new ApiService();
