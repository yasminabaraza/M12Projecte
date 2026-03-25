export default {
  "*.{json,md,css,html,yml,yaml}": ["prettier --write"],
  "backend/**/*.ts": ["prettier --write"],
  "frontend/**/*.{ts,tsx}": ["prettier --write"],
};
