import { createContext, useContext, useState } from "react";

const UserRoleContext = createContext({
    userRole: null,
    setUserRole: () => {},
})

export const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null)

    return (
        <UserRoleContext.Provider value = {{ userRole, setUserRole }}>
            {children}
        </UserRoleContext.Provider>
    )
}

export const useUserRoleData = () => useContext(UserRoleContext)