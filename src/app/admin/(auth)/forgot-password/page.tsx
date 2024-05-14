import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPasswordPage = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Forgot Password</h3>
                <p>Please enter your email address to receive a verification code!</p>
            </div>
            <ForgotPasswordForm />
        </>
    );
}

export default ForgotPasswordPage;