import React, { createContext, FC, useEffect, useMemo, useState } from 'react'
import { IUser, TypeSetState } from '../../types'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { users } from '../layout/sidebar/dataUsers'
import { Firestore, getFirestore } from 'firebase/firestore'


interface IContext {
    user: IUser | null
    setUser: TypeSetState<IUser | null>
    ga: Auth
    db: Firestore
}

interface AuthProviderProps {
    children: React.ReactNode
}
export const AuthContext = createContext<IContext>({} as IContext)


export const AuthProvider: FC<AuthProviderProps> = ({ children })=> {
    const [user, setUser] = useState<IUser | null>(null)
    const ga = getAuth()
    const db = getFirestore()


    useEffect(()=> {
        const unListen = onAuthStateChanged(ga, authUser => {
            if(authUser) {
                setUser( {
                    _id: authUser.uid,
                    avatar: users[1].avatar, 
                    name: authUser.displayName || '',  
                })
            } else {
                setUser(null)
            } 
        })
        return () => {
            unListen()
        }
    }, []);

    const values = useMemo(() => ({
        user,
        setUser,
        ga,
        db
    }), [user, ga, db])

    return (
        <AuthContext.Provider value={values}>{ children }</AuthContext.Provider>
    )
}