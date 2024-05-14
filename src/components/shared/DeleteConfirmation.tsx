import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { tableData } from '@/lib/actions'
import { useDeleteStore } from '@/store/slices/deleteConfirmation/delete'

const DeleteConfirmation = ({text,module}:{text:string, module:string}) => {
    const deleteConfirmation = useDeleteStore((state:any)=>state.deleteConfirmation);
    const toggleDeleteConfirmation = useDeleteStore((state:any)=>state.toggleDeleteConfirmation);
    const selectedItem = useDeleteStore((state:any)=>state.selectedItem);

    const onDialogClose = () => {
        toggleDeleteConfirmation(false);
    }

    const onDelete = async () => {
        toggleDeleteConfirmation(false)
        const data = await tableData(
            `content-manager/collection-types/api::${module}.${module}/${selectedItem}`,"DELETE"
        )
        if (!data?.error) {
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }else{
            toast.push(
                <Notification
                    title={'Internal server error'}
                    type="danger"
                    duration={2500}
                >
                    Internal server error
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteConfirmation}
            type="danger"
            title="Delete product"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                {text}
            </p>
        </ConfirmDialog>
    )
}

export default DeleteConfirmation
