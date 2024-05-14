import DataTableComponent from './DataTableComponent'
import { tableData } from '@/lib/actions'
import { HiPlusCircle } from 'react-icons/hi'
import Link from 'next/link'

const DynamicPages = async ({ params }: { params: any }) => {
    const module = params.module.slice(0, -1)
    const data: any = await tableData(
        `content-manager/collection-types/api::${module}.${module}`,
        'GET',
    )
    const colsData: any = await tableData(
        `content-type-builder/content-types/api::${module}.${module}`,
        'GET',
    )

    const columns = Object.keys(colsData?.data?.schema?.attributes)
        .filter(
            (key) =>
                colsData?.data?.schema?.attributes[key].type !== 'relation',
        )
        .map((key) => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
        }))

    return (
        <>
            <div className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <h1 className="text-2xl pl-5">
                        {module.charAt(0).toUpperCase() + module.slice(1)}
                    </h1>
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        href={`/admin/${params.module}/add`}
                    >
                        <button className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-9 px-3 py-2 text-sm w-full">
                            <span className="flex items-center justify-center">
                                <HiPlusCircle />
                                <span className="ltr:ml-1 rtl:mr-1">
                                    Add{' '}
                                    {module.charAt(0).toUpperCase() +
                                        module.slice(1)}
                                </span>
                            </span>
                        </button>
                    </Link>
                </div>
                <DataTableComponent
                    data={data}
                    columns={columns}
                    module={module}
                />
            </div>
        </>
    )
}

export default DynamicPages
