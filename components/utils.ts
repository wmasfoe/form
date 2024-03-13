import { Component, defineAsyncComponent } from 'vue';
import { SupportComponent } from './form/typing'

export class ComponentFactory {
  private compMap: Map<string, Component>;

  constructor() {
    this.compMap = new Map<string, Component>();
  }

  register(name: string, component: Component) {
    if(this.compMap.has(name)) {
      console.warn(`Component ${name} has been registered.`);
    } else {
      this.compMap.set(name, component);
    }
  }

  get(name: string): Component | undefined {
    return this.compMap.get(name);
  }
}

export const useComponentFactory = () => new ComponentFactory();

// 按需导入 element-plus 组件，样式？
async function asyncRegisterComponent(factory: ComponentFactory, name: string) {
  const formatName = name.charAt?.(0)?.toUpperCase() + name.slice(1);
  const compName = `El${formatName}`;
  try {
    // 组件
    factory.register(name, defineAsyncComponent(() => import('element-plus').then((module) => module?.[compName] as Component)));
    // 样式
    // import(`element-plus/lib/theme-chalk/el-${name}.css`);
  } catch(e: any) {
    console.error(e);
  }
}

export const useElementPlusComponents = (factory: ComponentFactory, compName: SupportComponent) => {
  asyncRegisterComponent(factory, compName);
}
