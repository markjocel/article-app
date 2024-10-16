'use client';

import ArticleForm from '@/components/article-form/article-form';
import Header from '@/components/header/header';
import Modal from '@/components/modal/modal';
import ProtectedRoute from '@/components/ProtectedRoute';
import { createArticle } from '@/services/articleService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateArticlePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');


  const handleSubmit = async () => {
    setLoading(true);
    const newArticle = {
      title,
      body,
    };

    try {
      const createdArticle = await createArticle(newArticle);
      setModalTitle("Success!")
      setMessage(`Article created with ID: ${createdArticle.id}`);
    } catch (error: any) {
      setModalTitle("Oops!")
      setMessage(error.message);
    }
    setIsModalOpen(true);
    setLoading(false);
  };

  const closeModal = () => {
    router.push('/articles');
    setIsModalOpen(false);
  };

  return (
    <ProtectedRoute>
      <ArticleForm initialValues={{}} onSubmit={handleSubmit} formTitle="Create Article" message={message} isLoading={isLoading} />
      {isModalOpen && (
        <Modal message={message} title={modalTitle} onClose={closeModal} />
      )}
    </ProtectedRoute>
  );
};

export default CreateArticlePage;