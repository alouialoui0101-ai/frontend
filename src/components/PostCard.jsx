import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';
import CommentSection from './CommentSection.jsx';
import { timeAgo } from '../utils/time.js';

const PostCard = ({ post, onLike, onDelete, onAddComment, onDeleteComment }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  const liked = post.likes?.some((id) => id === user?._id || id?._id === user?._id);
  const isOwner = post.author?._id === user?._id;
  const roleLabel = post.author?.role === 'teacher' ? 'معلّم' : 'طالب';

  return (
    <article className="post">
      <div className="post-head">
        <Avatar user={post.author} />
        <div className="meta">
          <h4>
            {post.author?.name || 'مستخدم'}
            <span className={`role-chip ${post.author?.role === 'teacher' ? 'teacher' : ''}`}>{roleLabel}</span>
          </h4>
          <div className="time">{timeAgo(post.createdAt)}</div>
        </div>
        {isOwner && (
          <button className="post-del" title="حذف المنشور" onClick={() => onDelete(post._id)}>🗑️</button>
        )}
      </div>

      <div className="post-body">{post.content}</div>

      <div className="post-actions">
        <button className={`act-btn ${liked ? 'liked' : ''}`} onClick={() => onLike(post._id)}>
          {liked ? '❤️' : '🤍'} إعجاب ({post.likes?.length || 0})
        </button>
        <button className="act-btn" onClick={() => setShowComments((s) => !s)}>
          💬 تعليق ({post.comments?.length || 0})
        </button>
      </div>

      {showComments && (
        <CommentSection
          postId={post._id}
          comments={post.comments || []}
          onAdd={onAddComment}
          onDelete={onDeleteComment}
        />
      )}
    </article>
  );
};

export default PostCard;
