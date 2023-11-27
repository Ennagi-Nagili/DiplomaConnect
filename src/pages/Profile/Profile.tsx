type ProfileProps = {
  firstName: string;
  lastName: string;
};

const Profile = (props: ProfileProps) => {
  const { firstName, lastName } = props;

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome {firstName} {lastName}</h2>
    </div>
  );
};

export default Profile;
