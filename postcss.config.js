module.exports = {
  plugins: [
    // Add vendor prefixes for browser compatibility
    require('autoprefixer')({
      cascade: true,
      grid: 'autoplace'
    }),
    // Minify CSS only in production (when --env production is set)
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('cssnano')({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true
                },
                normalizeWhitespace: true,
                colormin: true,
                minifyFontValues: true,
                minifySelectors: true
              }
            ]
          })
        ]
      : [])
  ]
};
