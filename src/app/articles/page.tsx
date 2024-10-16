'use client'

import Link from 'next/link';
import { fetchArticles } from '../../services/articleService';
import { Article } from '../../types/Article';
import styles from './page.module.scss';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header/header';
import ArticleCard from '@/components/article-card/article-card';
import Image from 'next/image';

const ArticlesPage = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleAuthorId, setArticleAuthorId] = useState<number | string>('');


  const handleSearch = () => {
    const results = articles.filter(post => {
      const userId = Number(articleAuthorId);
      const matchesUserId = articleAuthorId ? post.userId === userId : true;
      const matchesTitle = articleTitle.length ? post.title.includes(articleTitle) : true;
      return matchesUserId && matchesTitle;
    });
    setFilteredArticles(results);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const loadArticles = async () => {
        try {
          const fetchedArticles = await fetchArticles();
          setArticles(fetchedArticles);
          setFilteredArticles(fetchedArticles);
        } catch (error) {
          console.error('Failed to fetch articles:', error);
        } finally {
          setLoading(false);
        }
      };

      loadArticles();
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <p>Loading articles...</p>; // Loading state
  }

  if (!isAuthenticated) {
    return null; // or a different loading/error message
  }
  return (

    <ProtectedRoute>
      <div className={styles.container}>

        <div className={styles.title}>
          <h1>Articles</h1>
          <Link href="/articles/create">
            <Image src={'/icon-add.svg'} width={25} height={25} alt='add' />
            Create new article
          </Link>
        </div>

        <div className={styles.searchForm}>
          <div className={styles.control}>
            <label htmlFor="articleTitle">Title</label>
            <input
              id='articleTitle'
              type="text"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="authorId">Author ID</label>
            <input
              id='authorId'
              type="number"
              value={articleAuthorId}
              onChange={(e) => setArticleAuthorId(e.target.value)}
              placeholder="Author ID"
            />
          </div>

          <button onClick={handleSearch}>Search</button>
        </div>

        <p>We found {filteredArticles.length} Articles</p>
        <div className={styles.articles}>
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ArticlesPage;