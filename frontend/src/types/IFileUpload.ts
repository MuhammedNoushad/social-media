interface IFileUpload {
    accountId: string;
    etag: string;
    originalFile: {
      accountId: string;
      fileUrl: string;
      filePath: string;
      etag: string;
      size: number;
      mime: string;
      metadata: {
        tags: string[];
        uploadId: string;
      };
      tags: string[];
      lastModified: number;
      originalFileName: string;
      file: object;
    };
    fileUrl: string;
    filePath: string;
  }

export default IFileUpload;