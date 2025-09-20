export interface YouTubeSearchItem {
    id: {
      kind: string;
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium: { url: string; width: number; height: number };
        high: { url: string; width: number; height: number };
      };
      channelTitle: string;
      publishedAt: string;
    };
  }
  
  export interface YouTubeSearchResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    regionCode?: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: YouTubeSearchItem[];
  }
  