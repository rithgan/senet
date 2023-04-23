import { useState, createContext, useEffect } from "react";

export const IpContext = createContext();

export const IpProvider = ({ children }) => {
    const getIPAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setIpAddress(data.ip);
        } catch (err) {
            console.log("Unable to get your ip address, please disable adblocker if any")
        }
    };
    const [ipAddress, setIpAddress] = useState();
    useEffect(() => {
        getIPAddress();
    }, [setIpAddress]);
    return (
        <IpContext.Provider value={[ipAddress, setIpAddress]}>
            {children}
        </IpContext.Provider>
    );
};