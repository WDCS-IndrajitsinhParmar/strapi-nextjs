import AuthLayout from "@/components/layouts/AuthLayout";

const AuthPagesLayout = ({children}:any) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}

export default AuthPagesLayout;