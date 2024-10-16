'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext'; // Adjust path as necessary
import Image from 'next/image';
import styles from './page.module.scss'

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('Bret');
  const [email, setEmail] = useState('Sincere@april.biz');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const success = await login(username, email);
    if (success) {
      router.push('/articles');
    } else {
      setError('Invalid username or email');
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.image}>
        <Image src={`/login2.svg`} alt='Login' width={800} height={800}></Image>
      </div>
      <div className={styles.form}>

        <Image className={styles.logo} src={`/logo.svg`} height={50} width={50} alt='Article Vault'></Image>
        <h1>Welcome back!</h1>
        <p>Please enter your details</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;