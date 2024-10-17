import Link from 'next/link';
import Image from 'next/image';
import styles from './article-card.module.scss';
import { Article } from '@/types/Article';
import { getRandomColor } from '@/utils/randomColor';
import { useEffect, useState } from 'react';


interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    const [bgColor, setBgColor] = useState(getRandomColor());


    useEffect(() => {
        setBgColor(getRandomColor());
    }, []);

    return (
        <div className={styles.article} style={{ backgroundColor: bgColor }}>
            <span className={styles.type}>ARTICLE</span>
            <h2 className={styles.title}>{article.title}</h2>
            <p className={styles.content}>{article.body}</p>
            <span className={styles.type}>Author ID: {article.userId}</span>
            <Link className={styles.editButton} href={`/articles/${article.id}`}>
                <Image src={`/icon-edit.svg`} alt='edit article' width={20} height={20} />
            </Link>
        </div>
    );
};

export default ArticleCard;