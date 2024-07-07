import s from './check-email.page.module.scss'

import { EmailForm } from '../../components/forms/email-form/email-form'
import { Page } from '../../components/ui/page'
export const CheckEmailPage = () => {
  return (
    <Page className={s.root}>
      <EmailForm />
    </Page>
  )
}
