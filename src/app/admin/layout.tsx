import Theme from "@/components/template/Theme";

const AdminLayout = ({children}:any) => {
    return (
        <Theme>
            {children}
        </Theme>
    );
}

export default AdminLayout;