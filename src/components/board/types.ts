/**
 * Available draggable types
 */
export enum DraggableTypes {
  CARD = "card",
  CONNECT = "connect",
}

/**
 * Block item representing one node in graph
 */
export type Item = { x: number; y: number; text: string; index: number };

/**
 * Data passed to React DnD
 */
export type DragItem = Pick<Item, "index" | "text">;

/**
 * Connection between two nodes (blocks)
 */
export type ConnectItem = { from: any; to: any };
