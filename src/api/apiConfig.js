const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f2db6f4bb7de9fb016be7720040c6c2a',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;