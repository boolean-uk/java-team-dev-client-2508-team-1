import { createContext, useContext, useState } from "react";

const UserRoleContext = createContext()

export const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(2)

    return (
        <UserRoleContext.Provider value = {{ userRole, setUserRole }}>
            {children}
        </UserRoleContext.Provider>
    )
}

export const useUserRoleData = () => useContext(UserRoleContext)