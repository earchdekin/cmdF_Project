import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import fetchUserData from './fetchuser';
import UserTable from './table';

interface UserData {
  username: string;
  words: string[];
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData[] | null>(null);

  const handleFetchUserData = async () => {
    try {
      const response = await fetchUserData();
      const data: UserData[] = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error in handleFetchUserData:', error);
    }
  };

  useEffect(() => {
    // You can also fetch data when the component mounts
    handleFetchUserData();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleDeleteRow = (index: number) => {
    // Create a new array without the deleted row
    const updatedUserData = [...userData];
    updatedUserData.splice(index, 1);
    setUserData(updatedUserData);
  };

  return (
    <div>
      <h1>Your Next.js Website</h1>
      <Button onClick={handleFetchUserData} colorScheme="teal">
        Fetch User Data
      </Button>

      <UserTable userData={userData} onDeleteRow={handleDeleteRow} />
    </div>
  );
};

export default Home;