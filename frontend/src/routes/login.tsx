import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '@app/components/auth/LoginPage'

export const Route = createFileRoute('/login')({
  component: () => {
    return <LoginPage />
  },
})
