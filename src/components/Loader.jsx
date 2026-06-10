const Loader = ({ full = false, text = 'جاري التحميل...' }) => {
  if (full) {
    return (
      <div className="full-loader">
        <div className="spinner" />
        <span>{text}</span>
      </div>
    );
  }
  return (
    <div className="loader">
      <div className="spinner" />
    </div>
  );
};

export default Loader;
