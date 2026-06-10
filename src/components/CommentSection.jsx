import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';
import { timeAgo } from '../utils/time.js';

const CommentSection = ({ postId, comments, onAdd, onDelete }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value || busy) return;
    setBusy(true);
    try {
      await onAdd(postId, value);
      setText('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="comments">
      {comments.map((c) => (
        <div className="comment" key={c._id}>
          <Avatar user={c.author} size="sm" />
          <div className="bubble">
            <h5>
              {c.author?.name || 'مستخدم'}
              <span className="time">· {timeAgo(c.createdAt)}</span>
            </h5>
            <p>{c.content}</p>
          </div>
          {c.author?._id === user?._id && (
            <button className="comment-del" title="حذف" onClick={() => onDelete(postId, c._id)}>🗑️</button>
          )}
        </div>
      ))}

      <form className="comment-form" onSubmit={submit}>
        <Avatar user={user} size="sm" />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          placeholder="أضف تعليقاً..."
        />
        <button type="submit" disabled={!text.trim() || busy}>➤</button>
      </form>
    </div>
  );
};

export default CommentSection;
