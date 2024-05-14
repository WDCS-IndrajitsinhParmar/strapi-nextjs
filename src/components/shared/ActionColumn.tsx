import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"
import { useDeleteStore } from "@/store/slices/deleteConfirmation/delete"
import Link from "next/link";

export default async function ActionColumn ({ row,module }: { row: any,module:string }) {
    const toggleDeleteConfirmation = useDeleteStore((state:any)=>state.toggleDeleteConfirmation);
    const setSelectedItem = useDeleteStore((state:any)=>state.setSelectedItem);
    const onEdit = () => {
        console.log("from edit")
    }

    const onDelete:any = async (id:any) => {
        toggleDeleteConfirmation(true);
        setSelectedItem(row.id);
    }

    return (
        <div className="flex justify-end text-lg">
            <Link
                href={`/admin/${module + "s"}/edit/${row.id}`}
                className={`cursor-pointer p-2 hover:text-green-500`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </Link>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={()=>onDelete(row.id)}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}