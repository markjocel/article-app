import { Article } from '../types/Article';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/';

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

export const fetchArticleById = async (id: number) => {
  const response = await fetch(`${API_URL}${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch the article');
  }
  return await response.json();
};

export const createArticle = async (article: { title: string; body: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to create article');
  }
  
  return await response.json();
};

export const updateArticle = async (id: number, article: { title: string; body: string }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    throw new Error('Failed to update article');
  }

  return await response.json();
};