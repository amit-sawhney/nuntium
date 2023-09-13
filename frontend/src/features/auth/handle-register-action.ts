import { useApi } from '@/api';
import { ActionFunction, redirect } from 'react-router-dom';

const handleRegisterAction: ActionFunction = async ({ request }) => {
  console.log('handleRegisterAction');
  const api = useApi();

  const data = await request.formData();

  const email = data.get('email');
  const password = data.get('password');
  const firstName = data.get('first-name');
  const lastName = data.get('last-name');

  if (!email || !password || !firstName || !lastName) {
    return {
      ok: false,
      status: 400,
      message: 'Please fill out required fields',
    };
  }

  const res = await api
    .registerCredentialsMethod({
      email: email.toString(),
      password: password.toString(),
      firstName: firstName.toString(),
      lastName: lastName.toString(),
    })
    .catch((error) => ({
      error,
    }));

  if (api.isError(res)) {
    return {
      ok: false,
      status: res.error.status,
      message: res.error.message,
    };
  }

  return redirect('/');
};

export default handleRegisterAction;
