/* eslint-disable no-console */
const AWS = require('aws-sdk');
const s3 = require('s3');

const awsS3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

const client = s3.createClient({
  s3Client: awsS3Client
});

console.log("Client created");

const params = {
  localDir: 'build',
  deleteRemoved: true,
  s3Params:{Bucket: process.env.AWS_S3_BUCKET, Prefix: "Library",}
};

const uploader = client.uploadDir(params);

uploader.on('error', (err) => {
  console.error('==> 😱  Unable to sync:', err.stack);
});

uploader.on('progress', () => {
  console.log(`==> 🚀  ${uploader.progressAmount} of ${uploader.progressTotal} complete`);
});

uploader.on('end', () => {
  console.log(`==> 🎉  Upload to ${process.env.AWS_S3_BUCKET} successful`);
});