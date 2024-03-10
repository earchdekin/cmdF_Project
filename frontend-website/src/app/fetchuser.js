
const fetchUserData = async (setUserData) => {
    try {
      const response = await fetch('/db/userlist/username'); 
      const data = await response.json();
      return data;
      console.log(data); // Output the JSON data in the console
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error
    }
  };
  
  export default fetchUserData;