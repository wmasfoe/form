import { Component } from 'vue';
import { ElInput, ElSelect, ElCascader, ElCheckbox, ElRadio } from 'element-plus'

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

// 按需导入 element-plus 组件，有bug
function asyncRegisterComponent(factory: ComponentFactory, name: string) {
  const formatName = name.charAt(0).toUpperCase() + name.slice(1);
  const compName = `El${formatName}`;
  import('element-plus').then((module) => {
    const comp = module[compName];
    if (comp) {
      factory.register(name, comp);
    }
  })
}

export const useElementPlusComponents = (factory: ComponentFactory) => {
  factory.register('input', ElInput);
  factory.register('select', ElSelect);
  factory.register('cascader', ElCascader);
  factory.register('checkbox', ElCheckbox);
  factory.register('radio', ElRadio);
}
