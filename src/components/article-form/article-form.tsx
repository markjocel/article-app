import { useState } from 'react';
import style from './article-form.module.scss'
import Link from 'next/link';

const ArticleForm = ({ initialValues, onSubmit, isEditing, formTitle, isLoading }: any) => {
    const [title, setTitle] = useState(initialValues.title || '');
    const [body, setBody] = useState(initialValues.body || '');

    const handleSubmit = (e: any) => {
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