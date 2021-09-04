import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  background: ${theme.colors.white};
  color: ${theme.colors.gray_003};
  -webkit-font-smoothing: antialiased;
}

body,
input,
select,
textarea {
  font: 400 1rem 'Inter', sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

strong {
  cursor: default;
}

[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Recharts Tooltip */
.recharts-tooltip-wrapper {
  .stocksGrowthTooltip {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-size: 14px;
    padding: 4px 16px;
    border-radius: 4px;
    box-shadow: 0 4px 8px ${theme.colors.primary_translucent_002};
  }
}
`;
