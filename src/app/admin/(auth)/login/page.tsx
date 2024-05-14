import SignInForm from "@/app/admin/(auth)/login/SignInForm";

const LoginPage = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome back!</h3>
                <p>Please enter your credentials to sign in!</p>
            </div>
            <SignInForm/>
        </>
    );
}

export default LoginPage;