const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};
  
const LoadingAnimation = () => (
    <div style={loadingStyle}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
);

export default LoadingAnimation;