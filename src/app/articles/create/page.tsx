'use client';

import ArticleForm from '@/components/article-form/article-form';
import Modal from '@/components/modal/modal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createArticle } from '@/services/articleService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateArticlePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');


  const handleSubmit = async (articleData: { title: string; body: string }) => {
    setLoading(true);
    
    try {
      const createdArticle = await createArticle(articleData);
      setModalTitle("Success!");
      setMessage(`Article created with ID: ${createdArticle.id}`);
    } catch (error: unknown) {
      setModalTitle("Oops!");
      if (error instanceof Error) {
        setMessage(error.message);
      }
    } finally {
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    router.push('/articles');
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <ArticleForm 
        initialValues={{}}  
        onSubmit={handleSubmit} 
        formTitle="Create Article" 
        isLoading={isLoading} 
      />
      {isModalOpen && (
        <Modal 
          message={message} 
          title={modalTitle} 
          onClose={closeModal} 
        />
      )}
    </ProtectedRoute>
  );
};

export default CreateArticlePage;