'use client'

import Link from 'next/link'
import { ConfirmDialog, RichTextEditor, StickyFooter } from '.'
import { HiOutlineSave, HiOutlineTrash } from 'react-icons/hi'
import { ComponentType, Fragment, useState } from 'react'
import { Button, Input, Select } from '../ui'
import { submit } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import ProductImages from './ImageListing'
import type { InputProps } from '@/components/ui/Input'
import NumericFormatInput from './NumericFormatInput'

export default function DynamicForm({
    moduleFieldsTypeData,
    moduleData,
    contentManagerData,
    formType,
}: {
    moduleFieldsTypeData: any
    moduleData?: any
    contentManagerData: any
    formType: string
}) {
    const dynamicFieldsData = moduleFieldsTypeData?.data?.schema?.attributes;
    const { id, createdAt, createdBy, updatedAt, updatedBy, ...data } =
        contentManagerData
    console.log(data)
    const formElements = Object.keys(data).map((fieldName, index) => {
        const fieldData = {
            ...dynamicFieldsData[fieldName],
            ...contentManagerData[fieldName],
        }
        let inputElement = null
        console.log(fieldData)
        switch (fieldData.type) {
            case 'string':
            case 'email':
            case 'password':
                inputElement = (
                    <Input
                        type={
                            fieldData.type === 'password'
                                ? 'password'
                                : fieldData.type === 'email'
                                  ? 'email'
                                  : 'text'
                        }
                        name={fieldName}
                        placeholder={
                            fieldData?.edit?.placeholder
                                ? fieldData?.edit?.placeholder
                                : ''
                        }
                        required={fieldData.required}
                        minLength={fieldData.minLength}
                        maxLength={fieldData.maxLength}
                        defaultValue={
                            formType === 'editForm'
                                ? moduleData[fieldName] : fieldData.default || ''
                        }
                        id={fieldName}
                        disabled={formType == 'editForm' && !fieldData.editable}
                        autoComplete="off"
                        // onChange={handleChange}
                    />
                )
                break

            case 'enumeration':
                const categories = fieldData?.enum.map((value: any) => ({
                    label: value,
                    value: value,
                }))
                inputElement = (
                    <Select
                        name={fieldName}
                        id="grid-status"
                        options={categories}
                        defaultValue={categories.filter(
                            (val: any) => val.value === fieldData.default,
                        )}
                    ></Select>
                )
                break

            // case "boolean":
            //   inputElement = (
            //       <RadioGroup id={fieldName} name={fieldName} disabled={formType=="editForm" && !fieldData.editable} required={fieldData.required}
            //       defaultValue={formType==="editForm" ?
            //       (fieldData.default ? `${fieldData.default}` : "null") : (
            //         moduleData && fieldName in moduleData.data.attributes
            //           ? `${moduleData.data.attributes[fieldName]}`
            //           : "null"
            //       )}>
            //         {/* <div className="flex items-center space-x-2">
            //           <RadioGroupItem value={"null"} id="r1" />
            //           <Label htmlFor="r1">Null</Label>
            //         </div> */}
            //         <div className="flex items-center space-x-2">
            //           <RadioGroupItem value={"true"} id="r2" />
            //           <Label htmlFor="r2">True</Label>
            //         </div>
            //         <div className="flex items-center space-x-2">
            //           <RadioGroupItem value={"false"} id="r3" />
            //           <Label htmlFor="r3">False</Label>
            //         </div>
            //       </RadioGroup>
            //   );
            //   break;

            case 'decimal':
            case 'integer':
            case 'big integer':
            case 'float':
                inputElement = (
                    <NumericFormatInput
                        customInput={Input as ComponentType}
                        name={fieldName}
                        required={fieldData.required}
                        placeholder={
                            fieldData?.edit?.placeholder
                                ? fieldData?.edit?.placeholder
                                : ''
                        }
                        defaultValue={
                            formType === 'editForm'
                                ? moduleData[fieldName] : fieldData.default || ''
                        }
                    />
                    // <Input
                    //     type="number"
                    //     placeholder={
                    //         fieldData?.placeholder
                    //             ? fieldData?.placeholder
                    //             : fieldName.charAt(0).toUpperCase() +
                    //                   fieldName.slice(1) || ''
                    //     }
                    //     name={fieldName}
                    //     required={fieldData.required}
                    //     defaultValue={
                    //         formType === 'editForm'
                    //             ? fieldData.default || ''
                    //             : moduleData &&
                    //                 fieldName in moduleData.data.attributes
                    //               ? moduleData.data.attributes[fieldName]
                    //               : ''
                    //     }
                    //     id={fieldName}
                    //     disabled={formType == 'editForm' && !fieldData.editable}
                    //     autoComplete="off"
                    //     //   onChange={handleChange}
                    // />
                )
                break

            case 'date':
            case 'datetime':
                inputElement = (
                    <Input
                        // className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                        type="date"
                        name={fieldName}
                        required={fieldData.required}
                        placeholder={
                            formType === 'editForm'
                                ? fieldData.default || ''
                                : moduleData &&
                                    fieldName in moduleData.data.attributes
                                  ? moduleData.data.attributes[fieldName]
                                  : ''
                        }
                        id={fieldName}
                        disabled={formType == 'editForm' && !fieldData.editable}
                        autoComplete="off"
                        //   onChange={handleChange}
                    />
                )
            break;

            case 'richtext':
                inputElement = (
                    <RichTextEditor
                        name={fieldName}
                        placeholder={
                            fieldData?.edit?.placeholder
                                ? fieldData?.edit?.placeholder
                                : ''
                        }
                        defaultValue={
                            formType === 'editForm'
                                ? fieldData.default || ''
                                : moduleData &&
                                    fieldName in moduleData.data.attributes
                                  ? moduleData.data.attributes[fieldName]
                                  : ''
                        }
                        // maxLength={fieldData.maxLength}
                        // minLength={fieldData.minLength}
                    />
                    // <input
                    //     // className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                    //     placeholder={
                    //         fieldData?.placeholder
                    //             ? fieldData?.placeholder
                    //             : fieldName.charAt(0).toUpperCase() +
                    //                   fieldName.slice(1) || ''
                    //     }
                    //     required={fieldData.required}
                    //     name={fieldName}
                    //     minLength={fieldData.minLength}
                    //     maxLength={fieldData.maxLength}
                    //     defaultValue={
                    //         formType === 'editForm'
                    //             ? fieldData.default || ''
                    //             : moduleData &&
                    //                 fieldName in moduleData.data.attributes
                    //               ? moduleData.data.attributes[fieldName]
                    //               : ''
                    //     }
                    //     id={fieldName}
                    //     // rows={5}
                    //     disabled={formType == 'editForm' && !fieldData.editable}
                    //     autoComplete="off"
                    //     //  onChange={handleChange}
                    // />
                )
                break

            case 'text':
                inputElement = (
                    <Input
                        // className="input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                        placeholder={
                            fieldData?.edit?.placeholder
                                ? fieldData?.edit?.placeholder
                                : fieldName.charAt(0).toUpperCase() +
                                      fieldName.slice(1) || ''
                        }
                        required={fieldData.required}
                        name={fieldName}
                        minLength={fieldData.minLength}
                        maxLength={fieldData.maxLength}
                        defaultValue={
                            formType === 'editForm'
                                ? moduleData[fieldName] : fieldData.default || ''
                        }
                        id={fieldName}
                        // rows={5}
                        disabled={formType == 'editForm' && !fieldData.editable}
                        autoComplete="off"
                        //  onChange={handleChange}
                    />
                )
                break

            case 'media':
                inputElement = (
                    // <div
                    //     key={index}
                    //     className="grid grid-cols-1 w-full max-w-sm items-center gap-2"
                    // >
                    <input
                        type="file"
                        id={fieldName}
                        accept={fieldData.allowedTypes.join(',')}
                        multiple={fieldData.multiple}
                        name={fieldName}
                        required={fieldData.required}
                        disabled={formType == 'editForm' && !fieldData.editable}
                        autoComplete="off"
                        // onChange={handleFileChange}
                    />
                    // </div>
                )
                break

            default:
                inputElement = null
        }

        return (
            fieldData.type !== 'relation' && (
                <div key={index} className="mb-6">
                    {/* LABEL FIELD */}
                    <label
                        htmlFor={fieldName}
                        className="mb-2 flex items-center font-semibold"
                    >
                        {fieldData?.edit?.label
                            ? fieldData?.edit?.label
                            : fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)}
                    </label>
                    {/* INPUT FIELD */}
                    {inputElement}
                    {/* DESCRIPTION FIELD */}
                    {fieldData?.edit?.description ? (
                        <p className="text-xs mt-1 font-normal text-gray-500 flex">
                            {fieldData?.edit?.description}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            )
        )
    })
    // console.log(formElements)
    const router = useRouter()

    const DeleteProductButton = () => {
        const [dialogOpen, setDialogOpen] = useState(false)

        const onConfirmDialogOpen = () => {
            setDialogOpen(true)
        }

        const onConfirmDialogClose = () => {
            setDialogOpen(false)
        }

        const handleConfirm = () => {
            setDialogOpen(false)
            router.push('/admin/faqs')
            // onDelete?.(setDialogOpen)
        }

        return (
            <>
                <Button
                    className="text-red-600"
                    variant="plain"
                    size="sm"
                    icon={<HiOutlineTrash />}
                    type="button"
                    onClick={onConfirmDialogOpen}
                >
                    Delete
                </Button>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    type="danger"
                    title="Delete product"
                    confirmButtonColor="red-600"
                    onClose={onConfirmDialogClose}
                    onRequestClose={onConfirmDialogClose}
                    onCancel={onConfirmDialogClose}
                    onConfirm={handleConfirm}
                >
                    <p>
                        Are you sure you want to delete this product? All record
                        related to this product will be deleted as well. This
                        action cannot be undone.
                    </p>
                </ConfirmDialog>
            </>
        )
    }
    console.log(formElements)

    return (
        <>
            <form action={submit}>
                <div className="grid grid-cols-1 p-6 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2">
                        {/* <div className="py-3 sm:py-6 pb-10 relative"> */}
                        {/* <Toaster position="top-right" theme="dark" richColors /> */}
                        {/* <h1 className="text-2xl px-3 sm:px-6 mb-4">{formType==="editForm" ? "Add" : "Update"} {moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}</h1> */}

                        {/* <div className="overflow-x-auto overflow-y-auto w-full h-[75vh] px-3 sm:px-6"> */}
                        {/* FORM  */}
                        {/* <div className="flex flex-col"> */}
                        {/* <div className="grid grid-cols-4"> */}
                        {formElements.map((curElem, index) => {
                            console.log(curElem)
                            return (
                                <>
                                    <Fragment key={index}>{curElem}</Fragment>
                                    <div className="lg:col-span-1">
                                        {/* <ProductImages values={values} /> */}
                                    </div>
                                </>
                            )
                        })}
                        {/* </div> */}
                    </div>
                    {/* </div> */}
                    {/* </div>   */}
                    {/* </div> */}
                </div>
                <StickyFooter
                    className=" w-full px-8 flex items-center justify-between py-4"
                    stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                    <div>
                        <DeleteProductButton />
                        {/* <DeleteConfirmation text="Are you sure?" module="faq"/>     */}
                    </div>
                    <div className="flex items-center">
                        <Link href={`/admin/faqs`}>
                            <Button
                                size="sm"
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                            >
                                Discard
                            </Button>
                        </Link>
                        <Button
                            size="sm"
                            variant="solid"
                            // loading={isSubmitting}
                            icon={<HiOutlineSave />}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </StickyFooter>
            </form>
        </>
    )
}
