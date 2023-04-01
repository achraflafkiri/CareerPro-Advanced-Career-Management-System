import RegisterForm from "../components/auth/RegisterForm";

function Register() {
    return (
        <div classNameName="row" style={{display: "flex", height: "calc(100vh - 97px)", alignItems: "center", justifyContent: "center"}}>
            <div className="col-md-12" style={{ width: "400px" }}>
                <div className="card">
                    <div className="card-body">
                        <h4 class="card-title">Sign up</h4>
                        {/* <p class="card-description"></p> */}
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
