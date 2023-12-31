import useSWR from 'swr'



import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../services/axios'




export declare type AuthMiddleware = 'auth' | 'guest'

export interface IUseAuth {
    middleware: AuthMiddleware
    redirectIfAuthenticated?: string
}

export interface IApiRequest {
    setErrors: React.Dispatch<React.SetStateAction<never[]>>
    setStatus: React.Dispatch<React.SetStateAction<any | null>>
    [key: string]: any
}


export const useAuth = ({ middleware, redirectIfAuthenticated }: IUseAuth) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const register = async (args: IApiRequest) => {
        const { setErrors, ...props } = args
        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async (args: IApiRequest) => {
        const { setErrors, setStatus, ...props } = args
        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })
    }


    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

   

    return {
        user,
        register,
        login,
        logout,
    }
}