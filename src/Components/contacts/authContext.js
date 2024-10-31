export const isAuthenticated = async (data) => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:B8mXd58e/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(JSON.stringify(data))}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        return !!data; 
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };
  