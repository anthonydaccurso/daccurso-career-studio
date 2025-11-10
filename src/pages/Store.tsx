function Store() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full" style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
        <iframe
          src="https://daccurso-career-studio-shop.fourthwall.com"
          className="w-full h-full border-0"
          title="Daccurso Career Studio Store"
          allow="payment; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}

export default Store;