import { useEffect } from 'react';

/* Controlled toast; parent manages {icon,msg,show} */
const Toast = ({ toast, onHide }) => {
  useEffect(() => {
    if (toast.show) {
      const t = setTimeout(onHide, 3200);
      return () => clearTimeout(t);
    }
  }, [toast, onHide]);

  return (
    <div className={`toast ${toast.show ? 'show' : ''}`}>
      <span>{toast.icon}</span>
      <span>{toast.msg}</span>
    </div>
  );
};

export default Toast;
