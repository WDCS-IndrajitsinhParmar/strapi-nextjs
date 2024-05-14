"use server"
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'

import { auth } from "@/auth"


export const tableData = async(url:string,method:string)=>{
    const a:any = await auth();
    try {
        let data: any = await fetch(`${process.env.STRAPI_APP_URL}/${url}`, {
            method: `${method}`,
            headers: {
                Authorization : `Bearer ${a?.user?.token}`,
                'Content-Type': 'application/json'
            }
        }).then((res)=>res.json()) 
        // console.log(data,"dkfja")
        return data;
    } catch(error) {
        throw new Error("Something went wrong(internal server error)")
    }
}

export const submit = async(formData:FormData)=>{
    console.log(formData);
}


// export const deleteData = async(url:string)=>{
//     const a:any = await auth();
//     console.log(`${process.env.STRAPI_APP_URL}/${url}`,"jdfsdaruuwei")
//     let data: any = await fetch(`${process.env.STRAPI_APP_URL}/${url}`, {
//         method: "GET",
//         headers: {
//             Authorization : `Bearer ${a?.user?.token}`,
//             'Content-Type': 'application/json'
//         }
//     }).then((res)=>res.json())
//     console.log(data,"jjjjjj")
//     return data;
// }



// menus api data
export const getMenusData = async () => {
    const a:any = await auth();
    try {
        let data: any = await fetch(`${process.env.STRAPI_APP_URL}/menus?nested&populate=*`, {
            headers: {
                "Authorization": `Bearer ${a?.user?.token}`,
            },
            cache: "no-store"
        });
        data = await data.json();
        console.log(data);
        let menu: any = [{
                key: 'apps',
                path: '',
                title: 'MODULES',
                translateKey: 'nav.apps',
                icon: 'apps',
                type: NAV_ITEM_TYPE_TITLE,
                authority: [ADMIN, USER],
                subMenu: []
        }]
        data?.data[0]?.attributes?.items?.data?.map((curElem: any) => 
            menu[0].subMenu = [
                ...menu[0]?.subMenu,
                {
                    key: 'apps.project',
                    path: curElem?.attributes?.url ? `/admin${curElem?.attributes?.url}` : '',
                    title: `${curElem?.attributes?.title}`,
                    translateKey: 'nav.appsProject.project',
                    icon: `${curElem?.attributes?.icon_field}`,
                    type: NAV_ITEM_TYPE_COLLAPSE,
                    authority: [ADMIN, USER],
                    subMenu: curElem?.attributes?.children?.data?.length>0 ? 
                            curElem?.attributes?.children?.data?.map((curElemx: any) =>
                                // curElem.subMenu = [
                                    // ...curElem.subMenu, 
                                    ({
                                        key: `appsProject.${curElemx?.attributes?.title}`,
                                        path: `${process.env.FRONTEND_APP_URL}/admin${curElemx?.attributes?.url}`,
                                        title: `${curElemx?.attributes?.title}`,
                                        translateKey: 'nav.appsProject.dashboard',
                                        icon: '',
                                        type: NAV_ITEM_TYPE_ITEM,
                                        authority: [ADMIN, USER],
                                        subMenu: [],
                                    }),
                                // ]    
                            ) : [],
                }
            ]
        )
        return menu;
    } catch (err) {        
        throw new Error("Error came while fetching menus data");
    }
}