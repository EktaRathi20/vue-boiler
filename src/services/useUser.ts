import ApiService from '@/middleware/ApiClient'
import { withLoader } from '@/utils'
import { getPaginatedData } from './usePagination'

export const useUser = () => {
    const getUsers = (params: any) => withLoader(() => getPaginatedData('/users', params))
    const getUserById = (id: string) => withLoader(() => ApiService.get(`/users/${id}`))
    const createUser = (data: any) => withLoader(() => ApiService.post('/users', data))
    const updateUser = (id: string, data: any) => withLoader(() => ApiService.put(`/users/${id}`, data))
    const deleteUser = (id: string) => withLoader(() => ApiService.delete(`/users/${id}`))

    return {
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
    }

}