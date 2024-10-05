// your code goes here.
const BASE_URL = 'http://localhost:3000';

export async function jobSearch(searchQuery) {
    try {
        const url = `${BASE_URL}/jobs?q=${searchQuery}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  export async function getJobDetails(jobId) {
    try {
        const url = `${BASE_URL}/jobs/${jobId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch details of the requested job.');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
      return null;
    }
  }