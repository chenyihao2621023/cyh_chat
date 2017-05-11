module.exports = {
    port: 9200,     // server port

    database: 'mongodb://127.0.0.1:27017/test',
    testDatabase: 'mongodb://127.0.0.1:27017/test',

    jwtSecret: 'jwt_token_secret',
    accessKey: 'qiniu_access_key',
    secretKey: 'qiniu_secret_key',
    bucket: 'bucket_name',
    bucketUrl: 'bucket_outside_url',
    // max message lenght. for both backend and frontend
    maxMessageLength: 1024,
}
