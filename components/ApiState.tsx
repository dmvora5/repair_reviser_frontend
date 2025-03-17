'use client'

import { parseAndShowErrorInToast, sucessToast } from "@/utils";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";


const ApiContext = createContext({} as any);

const ApiState = ({ error, isSuccess, children }: any) => {
    return (
        <ApiContext.Provider value={{ error, isSuccess }}>
            {children}
        </ApiContext.Provider>
    );
}

ApiState.SuccessMessage = ({ message }: any) => {
    const { isSuccess } = useContext(ApiContext);
    useEffect(() => {
        if (!isSuccess) return;
        sucessToast(message);
    }, [isSuccess])

    return <></>
}

ApiState.SuccessRedirect = ({ path }: any) => {
    const { isSuccess } = useContext(ApiContext);
    const router = useRouter();

    useEffect(() => {
        if (!isSuccess) return;
        router.push("/login");
    }, [isSuccess])

    return <></>;
}

ApiState.Error = () => {

    const { error } = useContext(ApiContext);
    useEffect(() => {
        if (error) {
            parseAndShowErrorInToast(error);
        }
    }, [error])

    return <></>
}

export default ApiState