import styles from "./Landing.module.css";

/** Editorial illustration, never presented as a photograph of a news event. */
export function Sunprint() {
  return (
    <svg className={styles.art} viewBox="0 0 420 280" fill="none" aria-hidden="true" focusable="false">
      <path fill="#2A9D8F" d="M228 38a96 96 0 1 0 0 192 96 96 0 0 0 0-192Z" />
      <path fill="#5B21B6" d="M155 51c-51 29-66 94-35 144 27 44 82 61 128 43L155 51Z" />
      <path fill="#4C1D95" d="M155 51a96 96 0 0 0 93 178L155 51Z" />
      <path stroke="#FAFAFA" strokeWidth="5" d="M228 41c-48 41-48 145 0 187M228 41c48 41 48 145 0 187M137 134h182M150 87c42 18 103 18 155 0M150 180c42-18 103-18 155 0" />
      <path stroke="#5B21B6" strokeWidth="10" d="M124 214c-40-6-36-31 7-61M314 83c47-8 68 7 52 28-17 24-62 51-112 72" />
      <path fill="#5B21B6" d="m349 65 26 10-26 12V65ZM174 246h103v8H174z" />
      <g fill="#FAFAFA" opacity=".5">
        <circle cx="178" cy="86" r="1" /><circle cx="203" cy="119" r="1.2" />
        <circle cx="261" cy="65" r="1" /><circle cx="278" cy="147" r="1.1" />
        <circle cx="185" cy="172" r="1.3" /><circle cx="246" cy="201" r="1" />
        <circle cx="152" cy="123" r="1" /><circle cx="285" cy="104" r="1.2" />
        <circle cx="220" cy="70" r="1" /><circle cx="211" cy="211" r="1.1" />
      </g>
    </svg>
  );
}