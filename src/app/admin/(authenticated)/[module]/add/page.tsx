import DynamicForm from "@/components/shared/DynamicForm";
import { tableData } from "@/lib/actions";


export default async function Page({params}:any){
    const module = params.module.slice(0, -1)
    const contentManagerData = await tableData(`content-manager/content-types/api::${module}.${module}/configuration`,"GET")
    const moduleFieldsTypeData: any = await tableData(
        `content-type-builder/content-types/api::${module}.${module}`,
        'GET',
    );
    const managerData = contentManagerData?.data?.contentType?.metadatas;
    return(
        <DynamicForm moduleFieldsTypeData={moduleFieldsTypeData} contentManagerData={managerData} formType="addForm"/>
    )
}

