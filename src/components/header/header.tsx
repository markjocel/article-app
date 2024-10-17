'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { currentUser, logout } = useAuth();
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  const handleLogout = () => {
    try {
        logout();
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

  if (isLoginPage) return null;

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logoNav}>
                    <div className={styles.logo}>
                        <Image src={`/logo.svg`} height={50} width={50} alt='Article Vault'></Image>
                        Article Vault
                    </div>


                    <Link href="/articles">
                        Articles
                    </Link>
                </div>

                <div className={styles.user}>
                    {`Hello 👋 ${currentUser?.name}!`}

                    <button onClick={handleLogout} className={styles.logoutButton}>
                        <Image src={`/icon-logout.svg`} alt='edit article' width={20} height={20} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;