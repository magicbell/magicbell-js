import { classicTheme, lightTheme, flatTheme } from "@magicbell/magicbell-react";

const themes = {
  light: lightTheme,
  classic: classicTheme,
  flat: flatTheme,
}

export const withTheme = (Story, context)  => {
  const themeName = context.parameters.theme || context.globals.theme;
  const themeNames = themeName === 'all' ? ['light', 'flat', 'classic'] : Array.isArray(themeName) ? themeName : [themeName];
  const selectedThemes = themeNames.map(n => themes[n]);

  const containerStyle = {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${selectedThemes.length}, 1fr)`,
  };

  return (
    <div style={containerStyle}>
      {themeNames.map(theme =>
        <div key={name} style={{
          width: '100%',
          height: '100%',
          background: themes[theme].background,
          minWidth: 600,
        }}>
          <Story args={{ theme: theme === 'default' ? undefined : themes[theme], ...context.args }} />
        </div>
      )}
    </div>
  )
}
