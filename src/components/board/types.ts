export enum DraggableTypes {
  CARD = "card",
  CONNECT = 'connect'
}

export type Item = { x: number; y: number; text: string; index: number };

export type DragItem = Pick<Item, 'index' | 'text'>
