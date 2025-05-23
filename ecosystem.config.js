module.exports = {
  apps: [
    {
      name: 'ajar-api',
      script: './dist/index.js',
      cwd: '/var/www/soulcode/ajar-api',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
