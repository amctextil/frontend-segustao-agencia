module.exports = {
  apps: [
    {
      name: 'admWeb',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        NUXT_SESSION_PASSWORD: 'c67efb823e274a3fb113ee2a950707be',
        API_URL: 'http://127.0.0.1:3333/api',
      },
    },
  ],
};
