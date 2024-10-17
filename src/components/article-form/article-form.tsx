import { useEffect, useState } from 'react';
import style from './article-form.module.scss'
import Link from 'next/link';

interface ArticleFormProps {
    initialValues: { title: string; body: string };
    onSubmit: (data: { title: string; body: string }) => void;
    isEditing: boolean;
    formTitle: string;
    isLoading: boolean;
}


const ArticleForm: React.FC<ArticleFormProps> = ({
    initialValues,
    onSubmit,
    isEditing,
    formTitle,
    isLoading,
  }) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [body, setBody] = useState(initialValues.body || '');

    useEffect(() => {
      setTitle(initialValues.title || '');
      setBody(initialValues.body || '');
    }, [initialValues]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoading) {
          onSubmit({ title, body });
        }
    };

    return (
        <div className={style.articleForm}>
            <h1>{formTitle}</h1>

            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.control}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={style.control}>
                    <label htmlFor="body">Body</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>

                <div className={style.buttons}>
                    <button><Link href='/articles'>Cancel</Link></button>
                    <button className={style.primaryButton} type="submit">{isEditing ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;