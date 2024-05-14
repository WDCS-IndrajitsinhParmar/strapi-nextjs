import { useMemo } from 'react'
import {useSearchParams} from "next/navigation";

export default function useQuery(): URLSearchParams {
    const search  = useSearchParams()
    return useMemo(() => new URLSearchParams(search), [search])
}
