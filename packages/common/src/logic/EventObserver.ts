export interface EventObserver {
  id: number;
  callback: () => void;
}
