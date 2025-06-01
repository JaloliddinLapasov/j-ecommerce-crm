import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 500, // Virtual Users
  duration: '30s', // Test davomiyligi 
};

export default function () {
  // Asosiy sahifani test qilamiz
  http.get('https://crm-for-assignment-xi.vercel.app/');

  // Misol uchun login sahifasi (POST so‘rov)
  // http.post('https://crm-for-assignment-xi.vercel.app/api/auth/login', JSON.stringify({
  //   email: 'test@example.com',
  //   password: '123456'
  // }), {
  //   headers: { 'Content-Type': 'application/json' }
  // });

  sleep(1); 
}