function Account({ user }) {
  return (
    <div className="my-8 font-oswald text-xl">
      <div>Full Name : {user?.fullName ? user?.fullName : user?.name}</div>
      <div>Email : {user?.email} </div>
      <div>Phone Number : {user?.phone} </div>
      <div>Address : {user?.address} </div>
      <div>Job : {user?.job} </div>
      <div>Bio : {user?.bio} </div>
    </div>
  );
}

export default Account;
