import React, { createContext, useContext, useState } from "react";

import { DeviceInfo, Location} from "../interfaces";

interface IChildren {
    children: React.ReactNode
}

const AppContext = createContext<any | null>(null);

const initialState = {login: false, addapi: false}
const initialLocation = { lat: 0, lon: 0, time: 0 } as Location
const initialDeviceInfo = {
    browserFullVersion: "",
    browserMajorVersion: "",
    browserName: "",
    engineName: "",
    engineVersion: "",
    isBrowser: true,
    osName: "",
    osVersion: "",
    userAgent: ""
} as DeviceInfo

export const ContextProvider: React.FC<IChildren> = ({children}) => {
    const [activeMenu, setActiveMenu] = useState<boolean>(false)
    const [isLoggedIn, setisLoggedIn] = useState<boolean>(false)
    const [screenSize, setScreenSize] = useState<any>(undefined)
    const [isClicked, setIsClicked] = useState<{}>(initialState)
    const [deviceLocation, setDeviceLocation] = useState<Location>(initialLocation)
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(initialDeviceInfo)
    const [deviceIP, setDeviceIP] = useState<string>("")
    const [trigger, setTrigger] = useState<boolean>(false)

    const handleClicked = (clicked: string) => {
        setIsClicked({...initialState, [clicked]: true})
    }

    const handleUnclicked = (clicked: string) => {
        setIsClicked({...initialState, [clicked]: false})
    }

    const triggerRefresh = () => setTrigger(prev => !prev)

    const values = {activeMenu,isLoggedIn,screenSize,
        setActiveMenu,setisLoggedIn,setScreenSize,
        isClicked, handleClicked, handleUnclicked,
        deviceLocation, setDeviceLocation, deviceInfo,
        setDeviceInfo, deviceIP, setDeviceIP, trigger, triggerRefresh}
    
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )
}

export const useContextProvider = () => useContext(AppContext)