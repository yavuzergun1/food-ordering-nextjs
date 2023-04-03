function ShowAccount({ user }) {
  return (
    <div className="my-8 font-oswald text-xl">
      <div>Full Name : {user?.fullName ? user?.fullName : user?.name}</div>
      <div>Email : {user?.email} </div>
      <div>Phone Number : {user?.phoneNumber} </div>
      <div>Address : {user?.address} </div>
      <div>Job : {user?.job} </div>
    </div>
  );
}

export default ShowAccount;
