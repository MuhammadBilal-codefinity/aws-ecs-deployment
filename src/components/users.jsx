import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([{
    id: 1,
    name: 'Alice'
  }, {
    id: 2,
    name: 'Bob'
  }
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user.id} className="user-card">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
