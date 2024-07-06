import s from './refister.page.module.scss'

import { RegisterForm } from '../../components/register-form/register-form'
import { Page } from '../../components/ui/page'

export const RegisterPage = () => {
  return (
    <Page className={s.root}>
      <RegisterForm />
    </Page>
  )
}
