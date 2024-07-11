import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import s from './message.page.module.scss'

import { Page } from '../../components/ui/page'
import { RootState } from '../../store/store'

export const MessagePage = () => {
  const params = useParams()
  const socketConnection = useSelector((state: RootState) => state?.user?.socketConnection)

  console.log('socketConnection', socketConnection)

  useEffect(() => {
    console.log('params.userId:', params.userId)
    if (socketConnection) {
      socketConnection.emit('message page', params.userId)
      console.log('Emitting message-page with userId:', params.userId)
    }
  }, [socketConnection])

  return <Page className={s.root}>{'Message Page'}</Page>
}
