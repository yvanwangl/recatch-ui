module.exports = {
    apps: [
        {
            name: "recatch-ui",
            script: "./build/service.js",
            watch: true,
            env: {
                "PORT": 8086,
                "NODE_ENV": "development"
            },
            env_production: {
                "PROXY_HOST": "localhost",
                "PROXY_PORT": 8082,
                "PORT": 8086,
                "NODE_ENV": "production",
            }
        }
    ]
};