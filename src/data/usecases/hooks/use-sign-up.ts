import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useSignUpMutation } from '~/infra/cache/mutations'
import { type SignUpProps } from '~/domain/models/sign-up'

import { zodResolver } from '@hookform/resolvers/zod'
import { validateSignUpSchema } from '~/validators'

export const useSignUp = () => {
  const navigate = useNavigate()

  const signUp = useSignUpMutation(navigate)

  const form = useForm<SignUpProps>({
    resolver: zodResolver(validateSignUpSchema)
  })

  const onSubmit: SubmitHandler<SignUpProps> = (data) => {
    signUp.mutate(data)
  }

  return {
    ...form,
    onSubmit,
    signUp
  }
}
