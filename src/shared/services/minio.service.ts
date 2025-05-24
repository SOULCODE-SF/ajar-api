import minioConnection from '../../libs/config/minioConnection';

const uploadFile = async (
  bucket: string,
  objectName: string,
  buffer: Buffer,
  mimeType: string,
): Promise<void> => {
  const exists = await minioConnection.bucketExists(bucket);
  if (!exists) {
    await minioConnection.makeBucket(bucket, 'us-east-1');
  }

  await minioConnection.putObject(bucket, objectName, buffer, buffer.length, {
    'Content-Type': mimeType,
  });
};

export default uploadFile;
