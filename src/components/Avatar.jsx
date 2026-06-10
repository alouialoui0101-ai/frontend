/* Initials-based avatar; shows image if profilePicture provided */
const colorFromName = (name = '') => {
  const palettes = [
    'linear-gradient(135deg,#0d6e4f,#10a372)',
    'linear-gradient(135deg,#7e22ce,#a855f7)',
    'linear-gradient(135deg,#b45309,#f59e0b)',
    'linear-gradient(135deg,#0369a1,#0ea5e9)',
    'linear-gradient(135deg,#be123c,#fb7185)',
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return palettes[sum % palettes.length];
};

const Avatar = ({ user, size = '' }) => {
  const name = user?.name || '؟';
  const initials = name.trim().slice(0, 2);
  return (
    <div className={`avatar ${size}`} style={{ background: colorFromName(name) }}>
      {user?.profilePicture ? <img src={user.profilePicture} alt={name} /> : initials}
    </div>
  );
};

export default Avatar;
