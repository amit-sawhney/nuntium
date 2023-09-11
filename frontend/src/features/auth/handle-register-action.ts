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
      message: 'Please fill out required feels',
    };
  }

  await api.registerCredentialsMethod({
    email: email.toString(),
    password: password.toString(),
    firstName: firstName.toString(),
    lastName: lastName.toString(),
  });

  return redirect('/dashboard');
};

export default handleRegisterAction;
