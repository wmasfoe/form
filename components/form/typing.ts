import { Component } from 'vue'

export type SupportComponent = 'input' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'cascader'
export type NormalObject = Record<string | symbol, any>

export interface CompProps {
  defaultValue?: any;
  modelValue?: any;
  [key: string]: any;
}

export interface FormConfigItem {
  field: string;
  label: string;
  component: SupportComponent | Component;
  props?: NormalObject | CompProps;
  rules?: NormalObject[];
  [key: string]: any;
}

export type FormConfig = FormConfigItem[]
