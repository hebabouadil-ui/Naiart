"use client";

import { Component, type ReactNode } from "react";

/**
 * Isolates WebGL / Three.js subtrees so a rendering failure (lost context,
 * unsupported device, driver crash) degrades to nothing instead of bubbling
 * up and taking down the whole page with an "Application error".
 */
export class SafeCanvas extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Swallow — the canvas is purely decorative.
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
