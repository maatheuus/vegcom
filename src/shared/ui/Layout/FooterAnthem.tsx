export function FooterAnthem() {
  return (
    <div className="mx-auto mb-10 grid max-w-5xl grid-cols-1 items-center border-b border-white/10 pb-10 sm:grid-cols-2">
      <p className="font-lora m-0 max-w-[18ch] text-center text-4xl leading-tight text-white italic max-sm:mx-auto md:text-5xl">
        Pequenos gestos na cozinha,{" "}
        <span style={{ color: "#bddba3" }}>grandes mudanças no mundo.</span>
      </p>

      <div
        className="footer-anthem-illus max-sm:-order-1 max-sm:mx-auto"
        aria-hidden="true"
      >
        <div className="footer-anthem-glow" />
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            className="footer-anthem-steam"
            d="M80 70 Q75 58 82 48 Q89 38 84 28"
            style={{ animationDelay: "0s" }}
          />
          <path
            className="footer-anthem-steam"
            d="M100 68 Q95 55 100 44 Q105 33 100 22"
            style={{ animationDelay: "1.3s" }}
          />
          <path
            className="footer-anthem-steam"
            d="M120 70 Q125 58 118 48 Q111 38 116 28"
            style={{ animationDelay: "2.6s" }}
          />

          <path
            className="footer-anthem-spark"
            d="M40 60 L42 64 L46 66 L42 68 L40 72 L38 68 L34 66 L38 64 Z"
            style={{ animationDelay: "0.5s" }}
          />
          <path
            className="footer-anthem-spark"
            d="M160 50 L162 54 L166 56 L162 58 L160 62 L158 58 L154 56 L158 54 Z"
            style={{ animationDelay: "1.8s" }}
          />
          <path
            className="footer-anthem-spark"
            d="M170 95 L171.5 98 L174.5 99.5 L171.5 101 L170 104 L168.5 101 L165.5 99.5 L168.5 98 Z"
            style={{ animationDelay: "2.6s" }}
          />

          <g>
            <path
              className="footer-anthem-stem"
              d="M100 130 Q100 110 98 92 Q96 78 100 62"
            />
            <path
              className="footer-anthem-stem"
              d="M99 100 Q90 95 82 92"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animationDelay: ".2s",
              }}
            />
            <path
              className="footer-anthem-stem"
              d="M99 85 Q110 80 118 78"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: 40,
                animationDelay: ".5s",
              }}
            />

            <ellipse
              className="footer-anthem-leaf"
              cx="78"
              cy="90"
              rx="9"
              ry="5"
              fill="#bddba3"
              transform="rotate(-20 78 90)"
              style={{ animationDelay: "0s" }}
            />
            <ellipse
              className="footer-anthem-leaf"
              cx="122"
              cy="76"
              rx="9"
              ry="5"
              fill="#d9ecc9"
              transform="rotate(20 122 76)"
              style={{ animationDelay: "0.4s" }}
            />
            <ellipse
              className="footer-anthem-leaf"
              cx="92"
              cy="75"
              rx="8"
              ry="4.5"
              fill="#bddba3"
              transform="rotate(-35 92 75)"
              style={{ animationDelay: "0.8s" }}
            />
            <ellipse
              className="footer-anthem-leaf"
              cx="108"
              cy="66"
              rx="8"
              ry="4.5"
              fill="#d9ecc9"
              transform="rotate(30 108 66)"
              style={{ animationDelay: "1.2s" }}
            />
            <ellipse
              className="footer-anthem-leaf"
              cx="100"
              cy="58"
              rx="7"
              ry="4"
              fill="#eef5e5"
              transform="rotate(0 100 58)"
              style={{ animationDelay: "1.6s" }}
            />
          </g>

          <g className="footer-anthem-bowl">
            <path
              d="M55 130 Q55 168 100 172 Q145 168 145 130 Z"
              fill="#0a1f14"
              stroke="#bddba3"
              strokeWidth="2"
            />
            <ellipse
              cx="100"
              cy="130"
              rx="45"
              ry="7"
              fill="#1e4530"
              stroke="#bddba3"
              strokeWidth="2"
            />
            <ellipse
              cx="100"
              cy="131"
              rx="42"
              ry="5"
              fill="#0a1f14"
              opacity="0.6"
            />
            <path
              d="M62 140 Q60 155 72 165"
              stroke="rgba(189,219,163,0.25)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
