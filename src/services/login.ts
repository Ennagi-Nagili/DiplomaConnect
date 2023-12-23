import { redirect, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

const cookie = new Cookies();

export async function login(email: string, password: string, remember: boolean) {
  if (cookie.get('mail') !== undefined) {
    const url = 'https://devedu-az.com:7001/Login?email=' + email + '&password=' + password;

    axios.post(url).then((response) => {
      if (parseJwt(response.data)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'teacher') {
        cookie.set('token', response.data);
        cookie.set('id', parseJwt(response.data).Id);
        if (remember || cookie.get('mail') !== undefined) {
          cookie.set('mail', email);
          cookie.set('password', password);
        }
        redirect('profile');
      } else if (parseJwt(response.data)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin') {
        const cookie = new Cookies();
        cookie.set('token', response.data);
        cookie.set('id', parseJwt(response.data).Id);
        if (remember || cookie.get('mail') !== undefined) {
          cookie.set('mail', email);
          cookie.set('password', password);
        }
        redirect('admin');
      }
    });
  } else {
    location.href = '/login';
  }
}
