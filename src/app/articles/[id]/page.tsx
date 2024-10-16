'use client'

import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchArticleById, fetchArticles, updateArticle } from '../../../services/articleService';
import { Article } from '../../../types/Article';
import { useEffect, useState } from 'react';
import Header from '@/components/header/header';
import ArticleForm from '@/components/article-form/article-form';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal/modal';

const EditArticlePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const articleData = await fetchArticleById(Number(id));
          setArticle(articleData);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchArticle();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    if (article) {
      try {
        const updatedArticle = await updateArticle(Number(id), article);
        setModalTitle("Success!")
        setMessage(`Article updated successfully: ${updatedArticle.id}`);
      } catch (error: any) {
        setModalTitle("Oops!")
        setMessage(error.message);
      }
    }
    setIsModalOpen(true);
    setLoading(false);
  };

  const closeModal = () => {
    router.push('/articles');
    setIsModalOpen(false);
  };

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRoute>
      <ArticleForm initialValues={article} onSubmit={handleSave} formTitle="Edit Article" message={message} isEditing isLoading={isLoading} />
      {isModalOpen && (
        <Modal message={message} onClose={closeModal} title={modalTitle} />
      )}
    </ProtectedRoute>
  );
};

export default EditArticlePage;