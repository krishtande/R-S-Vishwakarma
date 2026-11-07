const BackgroundGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-bg">
      <div 
        className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(200, 169, 126, 0.12) 0%, rgba(200, 169, 126, 0.02) 55%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
      <div 
        className="absolute bottom-[-5%] right-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(93, 64, 55, 0.08) 0%, rgba(93, 64, 55, 0.01) 55%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default BackgroundGlow;
