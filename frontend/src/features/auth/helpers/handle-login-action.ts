import { useApi } from '@/api';
import { ActionFunction, redirect } from 'react-router-dom';

const handleLoginAction: ActionFunction = async ({ request }) => {
  const api = useApi();

  const data = await request.formData();

  const email = data.get('email');
  const password = data.get('password');

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      message: 'Please fill out required fields',
    };
  }

  await api.loginWithCredentialsMethod({
    email: email.toString(),
    password: password.toString(),
  });

  return redirect('/dashboard');
};

export default handleLoginAction;
