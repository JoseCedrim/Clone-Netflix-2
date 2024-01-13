import axios from 'axios';

const apiKey = 'ffb9cd11b4d0670af07fbe9d1b894317';

const axe = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: apiKey,
    // Outros parâmetros da API, se necessário
  },
});

export default axe;
