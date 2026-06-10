import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';

const MAX = 3000;

const CreatePost = ({ onCreate }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const text = content.trim();
    if (!text || busy) return;
    setBusy(true);
    try {
      await onCreate(text);
      setContent('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="create-box">
      <div className="create-row">
        <Avatar user={user} />
        <textarea
          value={content}
          maxLength={MAX}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`بماذا تفكر يا ${user?.name?.split(' ')[0] || ''}؟ شارك سؤالاً أو فكرة...`}
        />
      </div>
      <div className="create-foot">
        <span className="char-count">{content.length}/{MAX}</span>
        <button className="btn-post" onClick={submit} disabled={!content.trim() || busy}>
          {busy ? '...جاري النشر' : '📤 نشر'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
