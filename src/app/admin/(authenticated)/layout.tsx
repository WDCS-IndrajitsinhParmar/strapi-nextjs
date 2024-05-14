
import UseClientSessionProviders from "./useClientSessionProviders";
import Layout from "@/components/layouts/Layouts";
import { getMenusData } from "@/lib/actions";
import useAuth from "@/utils/hooks/useAuth";

const AuthenticatedLayout = async({children}: any) => {
    const session = await useAuth();

    const menusData = await getMenusData();
    console.log("menusData = ", menusData);

    return (
        <UseClientSessionProviders menusData={menusData}>
            <Layout session={session}>
                {children}
            </Layout>
        </UseClientSessionProviders>        
    )
}

export default AuthenticatedLayout