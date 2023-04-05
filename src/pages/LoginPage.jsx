import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div
      classNameName="row"
      style={{
        display: "flex",
        height: "calc(100vh - 97px)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="col-md-12" style={{ width: "400px" }}>
        <div className="card">
          <div className="card-body">
            <h4 class="card-title">Login</h4>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
