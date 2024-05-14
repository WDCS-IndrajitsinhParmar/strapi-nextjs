import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordPage = ({ params }: any) => {
    
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Reset Password</h3>
                <p>Please enter your new password!</p>
            </div>
            <ResetPasswordForm token={params?.token} />
        </>
    );
}

export default ResetPasswordPage;