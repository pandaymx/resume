/// <reference types="vite/client" />

declare const __RESUME_DATA__: Record<string, unknown>;
declare const __AI_MEMORY__: string;

declare module '*?raw' {
  const content: string;
  export default content;
}
