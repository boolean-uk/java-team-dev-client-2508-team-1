import { useEffect, useState } from 'react';
import { getUserById } from '../../../service/apiClient';

const ProfileData = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserById(1);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
    console.log("heres the user " + setUser)
  }, []);

  if (!user) return <div>Loading...</div>;

  const { email } = user;
  const { id } = user.cohort  
  const { name } = user.roles[0]
  const { firstName, lastName, githubUrl, mobile, specialism, bio } = user.profile;

  return (
    <main>
      <h2 className="fullname">Full Name: {firstName} {lastName}</h2>
      <p className="email">Email: {email} </p>
      <p className="bio">Bio: {bio} </p>
      <p className="mobile">Mobile: {mobile}</p>
      <p className="githubURL">Github URL: {githubUrl}</p>
      <p className="cohort">Cohort: {id}</p>
      <p className="specialism">Specialism: {specialism}</p>
      <p className="role">Role: {name}</p>
    </main>
  );
};

export default ProfileData;