"use client";

export default function SentryExamplePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Sentry Test Page</h1>
      <p>
        Clique no botão para disparar um erro de teste e verificar se o Sentry
        está configurado corretamente.
      </p>
      <button
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
        onClick={() => {
          throw new Error(
            "Sentry test error — triggered from /sentry-example-page",
          );
        }}
      >
        Disparar erro de teste
      </button>
    </main>
  );
}
