import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section>
      <h1 style={{textAlign:"center"}}>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
