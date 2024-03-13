import { Component } from 'vue';

export class ComponentFactory {
  private compMap: Map<string, Component>;

  constructor() {
    this.compMap = new Map<string, Component>();
  }

  register(name: string, component: Component) {
    this.compMap.set(name, component);
  }

  get(name: string): Component | undefined {
    return this.compMap.get(name);
  }
}

export const useComponentFactory = () => new ComponentFactory();
