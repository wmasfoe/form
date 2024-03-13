import { Component } from 'vue'

export type SupportComponent = 'input' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'cascader'
type NormalObject = Record<string | symbol, any>

export interface FormConfigItem {
  field: string;
  label: string;
  component: SupportComponent | Component;
  props?: NormalObject;
  rules?: NormalObject[];
  [key: string]: any;
}

export type FormConfig = FormConfigItem[]
