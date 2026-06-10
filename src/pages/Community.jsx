import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api.js';
import { connectSocket, disconnectSocket } from '../services/socket.js';
import { useAuth } from '../context/AuthContext.jsx';
import CreatePost from '../components/CreatePost.jsx';
import PostCard from '../components/PostCard.jsx';
import Loader from '../components/Loader.jsx';
import Toast from '../components/Toast.jsx';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, icon: '', msg: '' });
  const postsRef = useRef([]);

  const notify = (icon, msg) => setToast({ show: true, icon, msg });
  const hideToast = useCallback(() => setToast((t) => ({ ...t, show: false })), []);

  // keep a ref in sync so socket handlers see fresh state
  const setPostsSafe = (updater) => {
    setPosts((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      postsRef.current = next;
      return next;
    });
  };

  // ── Initial load ──
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await api.get('/posts');
        if (active) setPostsSafe(data.posts);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  // ── Realtime (Socket.io) ──
  useEffect(() => {
    const socket = connectSocket();

    socket.on('post:new', (post) => {
      setPostsSafe((prev) =>
        prev.some((p) => p._id === post._id) ? prev : [post, ...prev]
      );
    });
    socket.on('post:delete', ({ _id }) =>
      setPostsSafe((prev) => prev.filter((p) => p._id !== _id))
    );
    socket.on('post:like', ({ _id, likes }) =>
      setPostsSafe((prev) => prev.map((p) => (p._id === _id ? { ...p, likes } : p)))
    );
    socket.on('comment:new', ({ postId, comment }) =>
      setPostsSafe((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: [...(p.comments || []), comment] }
            : p
        )
      )
    );
    socket.on('comment:delete', ({ postId, _id }) =>
      setPostsSafe((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: (p.comments || []).filter((c) => c._id !== _id) }
            : p
        )
      )
    );

    return () => disconnectSocket();
  }, []);

  // ── Actions (optimistic where useful; socket reconciles) ──
  const handleCreate = async (content) => {
    try {
      const { data } = await api.post('/posts', { content });
      setPostsSafe((prev) =>
        prev.some((p) => p._id === data.post._id) ? prev : [data.post, ...prev]
      );
      notify('✅', 'تم نشر منشورك');
    } catch (err) {
      notify('⚠️', err.message);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data } = await api.put(`/posts/${id}/like`);
      setPostsSafe((prev) => prev.map((p) => (p._id === id ? { ...p, likes: data.likes } : p)));
    } catch (err) {
      notify('⚠️', err.message);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('حذف هذا المنشور؟')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPostsSafe((prev) => prev.filter((p) => p._id !== id));
      notify('🗑️', 'تم حذف المنشور');
    } catch (err) {
      notify('⚠️', err.message);
    }
  };

  const handleAddComment = async (postId, content) => {
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { content });
      setPostsSafe((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                comments: p.comments?.some((c) => c._id === data.comment._id)
                  ? p.comments
                  : [...(p.comments || []), data.comment],
              }
            : p
        )
      );
    } catch (err) {
      notify('⚠️', err.message);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setPostsSafe((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, comments: p.comments.filter((c) => c._id !== commentId) }
            : p
        )
      );
    } catch (err) {
      notify('⚠️', err.message);
    }
  };

  return (
    <div className="community">
      <div className="comm-hdr">
        <div className="comm-hdr-ic">👥</div>
        <div>
          <h2>فضاء الطلبة</h2>
          <p>مرحباً {user?.name} — تواصل مع زملائك في الوقت الحقيقي</p>
        </div>
        <div className="comm-live">
          <span className="live-dot" /> مباشر
        </div>
      </div>

      <CreatePost onCreate={handleCreate} />

      {loading && <Loader full text="جاري تحميل المنشورات..." />}

      {!loading && error && (
        <div className="empty">
          <span className="ic">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="empty">
          <span className="ic">📭</span>
          <p>لا توجد منشورات بعد. كن أول من يشارك!</p>
        </div>
      )}

      {!loading && !error &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onDelete={handleDeletePost}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        ))}

      <Toast toast={toast} onHide={hideToast} />
    </div>
  );
};

export default Community;
