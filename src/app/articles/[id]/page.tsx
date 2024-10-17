'use client'

import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchArticleById, fetchArticles, updateArticle } from '../../../services/articleService';
import { Article } from '../../../types/Article';
import { useEffect, useState } from 'react';
import Header from '@/components/header/header';
import ArticleForm from '@/components/article-form/article-form';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal/modal';
import LoadingOverlay from '@/components/loading-overlay/loading-overlay';

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

  const handleSave = async (articleData: { title: string; body: string }) => {
    setLoading(true);
    try {
      const updatedArticle = await updateArticle(Number(id), articleData);
      setModalTitle("Success!");
      setMessage(`Article updated successfully: ${updatedArticle.id}`);
    } catch (error: any) {
      setModalTitle("Oops!");
      setMessage(error.message);
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    router.push('/articles');
    setIsModalOpen(false);
  };

  if (!article) {
    return <LoadingOverlay/>
  }

  return (
    <ProtectedRoute>
      <ArticleForm 
      initialValues={article} 
      onSubmit={handleSave} 
      formTitle="Edit Article" 
      isEditing 
      isLoading={isLoading} />

      {isModalOpen && (
        <Modal 
        message={message} 
        onClose={closeModal} 
        title={modalTitle} 
        />
      )}
    </ProtectedRoute>
  );
};

export default EditArticlePage;