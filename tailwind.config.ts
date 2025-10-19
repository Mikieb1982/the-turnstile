@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

:root {
  --radius: 0.75rem;
  --radius-md: 0.5rem;
  --radius-sm: 0.25rem;

  --color-background: 240 249 255;
  --color-foreground: 22 46 68;

  --color-card: 255 255 255;
  --color-card-foreground: 22 46 68;

  --color-primary: 30 58 138;
  --color-primary-foreground: 255 255 255;

  --color-secondary: 226 239 255;
  --color-secondary-foreground: 22 46 68;

  --color-accent: 245 158 11;
  --color-accent-foreground: 22 46 68;

  --color-muted: 241 245 249;
  --color-muted-foreground: 100 116 139;

  --color-border: 226 232 240;
  --color-input: 226 232 240;
  --color-ring: 30 58 138;

  --color-destructive: 239 68 68;
  --color-destructive-foreground: 255 255 255;
}

#root {
  min-height: 100vh;
  background-color: rgb(var(--color-background));
}

body {
  min-height: 100vh;
  color: rgb(var(--color-foreground));
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-image:
    /* Layer 1: top-left ethereal glow */
    radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.7), rgba(135, 206, 250, 0.18) 45%),
    /* Layer 2: top-right soft light */
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.7), rgba(135, 206, 250, 0.18) 45%),
    /* Layer 3: watermark logo */
    url("/background.png") center 20% / 420px auto no-repeat,
    linear-gradient(180deg, #CBE9FF 0%, #F0F9FF 100%);

  background-color: #f0f9ff;
  background-blend-mode: screen, screen, soft-light, normal;
  background-attachment: fixed;
}

