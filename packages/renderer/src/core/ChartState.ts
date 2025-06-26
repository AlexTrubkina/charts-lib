import {  ChartOptions, HoveredItem, InteractionState } from '../types';

export class ChartState {
  private _options: ChartOptions;
  private _interaction: InteractionState;
  private _subscribers: Array<() => void> = [];

  constructor(initialOptions: ChartOptions) {
    this._options = initialOptions;
    this._interaction = {
      hoveredItem: null,
      clickedItem: null,
      zoomLevel: 1,
      panOffset: { x: 0, y: 0 }
    };
  }

  get options(): ChartOptions {
    return this._options;
  }

  get interaction(): InteractionState {
    return this._interaction;
  }

  setOptions(newOptions: ChartOptions): void {
    this._options = { ...this._options, ...newOptions };
    this._notify();
  }

  setHoveredItem(item: HoveredItem | null): void {
    this._interaction.hoveredItem = item;
    this._notify();
  }

  // Zoom and pan methods
  zoom(factor: number, center: { x: number, y: number }): void {
    // Implement zoom logic
    this._notify();
  }

  // Subscription management
  subscribe(callback: () => void): () => void {
    this._subscribers.push(callback);
    return () => {
      this._subscribers = this._subscribers.filter(sub => sub !== callback);
    };
  }

  private _notify(): void {
    this._subscribers.forEach(callback => callback());
  }
}