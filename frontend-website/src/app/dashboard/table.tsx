import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

interface UserData {
    user: string;
    words: string[];
  }
  
  interface UserTableProps {
    userData: UserData[] | null;
    onDeleteRow: (index: number) => void;
  }


  const UserTable: React.FC<UserTableProps> = ({ userData, onDeleteRow }) => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Words</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData &&
            userData.map((user, index) => (
              <Tr key={index}>
                <Td>
                  {user.words.map((element, i) => (
                    <div key={i}>{element}</div>
                  ))}
                </Td>
                <Td>
                  <Button onClick={() => onDeleteRow(index)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          {!userData && (
            <Tr>
              <Td colSpan={3}>No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    );
  };
  
  export default UserTable;
