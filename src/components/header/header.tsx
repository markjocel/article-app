import { AuthContextType, useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';

const Header = () => {
    // const { currentUser } = useAuth();

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
                    {/* {`Hello 👋 ${authContext.currentUser?.name}!`} */}
                </div>
            </nav>
        </header>
    );
};

export default Header;