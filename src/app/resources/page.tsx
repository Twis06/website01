import fs from "fs";
import path from "path";

// 文件元信息类型
type FileMeta = {
  name: string;
  url: string;
  type: string;
};

/**
 * 获取资源文件列表的数据源函数。
 * 当前为本地文件读取，未来可切换为异步远程（如 S3/CDN）获取。
 * 若对接 S3/CDN，只需将此函数替换为异步 API 请求。
 */
function getFilesFromLocal(): FileMeta[] {
  const filesDir = path.join(process.cwd(), "public/files");
  if (!fs.existsSync(filesDir)) return [];
  const files = fs.readdirSync(filesDir);
  return files.map((name) => ({
    name,
    url: `/files/${name}`,
    type: name.split('.').pop() || 'file',
  }));
}

// 预留：未来可切换为异步获取 S3/CDN 文件列表
// async function getFilesFromS3(): Promise<FileMeta[]> {
//   // TODO: 调用 S3 或 CDN API 获取文件列表
//   // return fetch('https://your-cdn-endpoint/list').then(...)
//   return [];
// }

// 当前数据源（本地）
function getFiles(): FileMeta[] {
  return getFilesFromLocal();
  // 未来切换 S3/CDN：
  // return await getFilesFromS3();
}

export default function ResourcesPage() {
  const files = getFiles();

  return (
    <main className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">资源下载</h1>
      {files.length === 0 ? (
        <p className="text-gray-500">暂无文件。</p>
      ) : (
        <div className="bg-gray-50 rounded-lg shadow-sm p-4">
          <ul className="space-y-2">
            {files.map((file) => (
              <li key={file.name} className="flex items-center justify-between p-3 bg-white rounded-md hover:bg-gray-100 transition-colors">
                <span className="font-mono">{file.name}</span>
                <span className="text-xs text-gray-400 mr-4">{file.type.toUpperCase()}</span>
                <a
                  href={file.url}
                  download
                  className="text-blue-600 hover:underline"
                >
                  下载
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}