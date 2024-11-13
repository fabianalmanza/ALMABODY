const IMAGE_CACHE_KEY = 'image_cache';

export const cacheImages = (products) => {
  if (!Array.isArray(products)) return;
  
  const cache = {};
  products.forEach(product => {
    if (product.images) {
      Object.values(product.images).flat().forEach(url => {
        if (url) cache[url] = true;
      });
    }
  });
  
  try {
    localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching images:', error);
  }
};

export const isImageCached = (url) => {
  try {
    const cache = JSON.parse(localStorage.getItem(IMAGE_CACHE_KEY) || '{}');
    return !!cache[url];
  } catch (error) {
    console.error('Error checking image cache:', error);
    return false;
  }
}; 