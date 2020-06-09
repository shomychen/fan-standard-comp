module.exports = {
  plugins: [ {
    resolve: `gatsby-plugin-less`,
    options: {
      javascriptEnabled: true,
    },
  },
    'gatsby-theme-docz',
    `gatsby-transformer-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
