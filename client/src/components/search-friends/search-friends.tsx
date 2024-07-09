import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import axios from 'axios'

import s from './search-friends.module.scss'

import { UserState } from '../../store/userSlice'
import { useDebounce } from '../../utils/use-debounce'
import { Input } from '../ui/input/input'
import { Typography } from '../ui/typography'
import { UserSearchCard } from '../user-search-card/user-search-card'

export const SearchFriends = () => {
  const [searchUser, setSearchUser] = useState<UserState[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 500)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleClear = () => {
    setSearch('')
  }

  const handleSearchFriends = async () => {
    const URL = `${import.meta.env.VITE_REACT_BACKEND_URL}/api/search-users`

    setLoading(true)
    try {
      const response = await axios.post(URL, {
        search: debouncedSearch,
      })

      setSearchUser(response.data.data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearchFriends()
  }, [debouncedSearch])
  console.log('search user', searchUser)

  return (
    <div className={s.root}>
      <Typography variant={'h2'}>{'Just Search Friends'}</Typography>
      <div className={s.inputWrapper}>
        <Input
          clear={handleClear}
          onChange={handleOnChange}
          placeholder={'Search by name or email...'}
          type={'search'}
          value={search}
        />
      </div>

      <div className={s.scrollContainer}>
        <div className={s.userList}>
          {searchUser.length === 0 && !loading && (
            <Typography className={s.notify} variant={'subTitle2'}>
              {'User not found'}
            </Typography>
          )}
          {loading && (
            <Typography className={s.notify} variant={'subTitle2'}>
              {'Loading....'}
            </Typography>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user: UserState) => <UserSearchCard key={user._id} user={user} />)}
        </div>
      </div>
    </div>
  )
}
