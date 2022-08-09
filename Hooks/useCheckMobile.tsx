
import React, {useEffect, useState} from "react";
import { Platform } from "react-native";


const useCheckMobile = () => {
    if(Platform.OS === "ios" || Platform.OS === "android")
        return true;

    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}

export default useCheckMobile;