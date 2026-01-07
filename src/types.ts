export interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface ServerStatus {
  online: number;
  rates: { xp: string; sp: string; adena: string };
}
