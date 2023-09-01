const Login = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="space-y-8 w-2/3 pt-52">
        <h1 className="text-2xl">Sign in to your account</h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <button className="bg-blue-500 text-white rounded-md py-2 w-full">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
