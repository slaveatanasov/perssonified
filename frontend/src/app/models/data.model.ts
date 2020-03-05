export interface NewsApiData {
  status: string, 
  totalResults: number, 
  articles: any[]
}

export interface Articles {
  source: {
    id: null | number | string,
    name: null | string
  },
  author: null | string,
  title: null | string,
  description: null | string,
  url: null | string,
  urlToImage: null | string,
  publishedAt: null | string,
  content: null | string
}