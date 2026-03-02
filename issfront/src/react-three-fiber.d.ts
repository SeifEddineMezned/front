import { Line } from "three";
import { Object3DNode } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    line: Object3DNode<Line, typeof Line>;
  }
}
