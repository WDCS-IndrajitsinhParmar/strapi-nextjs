// 'use client'

// import { useEffect, useState } from 'react'
// import { theme } from 'twin.macro'

// const twBreakpoint = theme<{
//     xs: string
//     sm: string
//     md: string
//     lg: string
//     xl: string
//     '2xl': string
// }>`screens`

// // const breakpointInt = (str = '') => {
// //     return parseInt(str.replace('px', ''))
// // }

// // const breakpoint = {
// //     '2xl': breakpointInt(twBreakpoint['2xl']), // 1536
// //     xl: breakpointInt(twBreakpoint.xl), // 1280
// //     lg: breakpointInt(twBreakpoint.lg), // 1024
// //     md: breakpointInt(twBreakpoint.md), // 768
// //     sm: breakpointInt(twBreakpoint.sm), // 640
// //     xs: breakpointInt(twBreakpoint.xs), // 576
// // }

// const useResponsive = () => {
//     // const getAllSizes = (comparator = 'smaller') => {
//     //     const currentWindowWidth = window.innerWidth
//     //     return Object.fromEntries(
//     //         Object.entries(breakpoint).map(([key, value]) => [
//     //             key,
//     //             comparator === 'larger'
//     //                 ? currentWindowWidth > value
//     //                 : currentWindowWidth < value,
//     //         ])
//     //     )
//     // }

//     // const getResponsiveState = () => {
//     //     const currentWindowWidth = window.innerWidth
//     //     return {
//     //         windowWidth: currentWindowWidth,
//     //         larger: getAllSizes('larger'),
//     //         smaller: getAllSizes('smaller'),
//     //     }
//     // }

//     const [responsive, setResponsive] = useState("getResponsiveState()")

//     // const resizeHandler = () => {
//     //     const responsiveState = getResponsiveState()
//     //     setResponsive(responsiveState)
//     // }
    
//     // useEffect(() => {
//     //     window.addEventListener('resize', resizeHandler)
//     //     return () => window.removeEventListener('resize', resizeHandler)
//     //     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // }, [responsive.windowWidth])

//     return responsive
// }

// export default useResponsive
import { useEffect, useState } from 'react';

const twBreakpoint = {
    xs: '576px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

const breakpointInt = (str = '') => {
    return parseInt(str.replace('px', ''));
}

const breakpoint = {
    '2xl': breakpointInt(twBreakpoint['2xl']), // 1536
    xl: breakpointInt(twBreakpoint.xl), // 1280
    lg: breakpointInt(twBreakpoint.lg), // 1024
    md: breakpointInt(twBreakpoint.md), // 768
    sm: breakpointInt(twBreakpoint.sm), // 640
    xs: breakpointInt(twBreakpoint.xs), // 576
}

const useResponsive = () => {
    // const getAllSizes = (comparator = 'smaller') => {
    //     const currentWindowWidth = window.innerWidth;
    //     return Object.fromEntries(
    //         Object.entries(breakpoint).map(([key, value]) => [
    //             key,
    //             comparator === 'larger'
    //                 ? currentWindowWidth > value
    //                 : currentWindowWidth < value,
    //         ])
    //     );
    // }
    const getAllSizes = (comparator = 'smaller') => {
        let currentWindowWidth = 0;
        if (typeof window !== 'undefined') {
          currentWindowWidth = window.innerWidth;
        }
      
        return Object.fromEntries(
          Object.entries(breakpoint).map(([key, value]) => [
            key,
            comparator === 'larger' ? currentWindowWidth > value : currentWindowWidth < value,
          ])
        );
      };

    // const getResponsiveState = () => {
    //     const currentWindowWidth = window.innerWidth;
    //     return {
    //         windowWidth: currentWindowWidth,
    //         larger: getAllSizes('larger'),
    //         smaller: getAllSizes('smaller'),
    //     }
    // }

    const getResponsiveState = () => {
        let windowWidth = 0;
        if (typeof window !== 'undefined') {
          windowWidth = window.innerWidth;
        }
      
        return {
          windowWidth: windowWidth,
          larger: getAllSizes('larger'),
          smaller: getAllSizes('smaller'),
        };
      };

    const [responsive, setResponsive] = useState(getResponsiveState());

    const resizeHandler = () => {
        const responsiveState = getResponsiveState();
        setResponsive(responsiveState);
    }
    
    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responsive.windowWidth]);

    return responsive;
}

export default useResponsive;
