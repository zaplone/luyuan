/**
 * 验证图片 URL 是否有效
 * @param url 图片 URL
 * @returns 是否为有效的图片 URL
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  // 移除前后空格
  const trimmedUrl = url.trim();
  
  if (trimmedUrl === '') {
    return false;
  }
  
  // 检查是否是有效的 URL 格式
  // 支持：
  // 1. 绝对 HTTP/HTTPS URL: https://example.com/image.jpg
  // 2. 本地绝对路径: /images/photo.png
  return trimmedUrl.startsWith('http://') || 
         trimmedUrl.startsWith('https://') || 
         trimmedUrl.startsWith('/');
}

/**
 * 获取安全的图片 URL，如果无效则返回占位符
 * @param url 图片 URL
 * @param fallback 备用图片 URL（默认为占位符）
 * @returns 有效的图片 URL
 */
export function getSafeImageUrl(
  url: string | null | undefined, 
  fallback: string = '/images/placeholder.svg'
): string {
  return isValidImageUrl(url) ? url!.trim() : fallback;
}
