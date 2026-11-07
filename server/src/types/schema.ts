export type ScreenData = Record<string, unknown>;

export interface UIStack {
  type: 'stack';
  children: UIComponents[];
}

export interface UISection {
  type: 'section';
  props: {
    title: string;
  };
  children: UIComponents[];
}

export interface UIText {
  type: 'text';
  props: {
    value: string;
    style?: 'body' | 'muted';
  };
}

export interface UISwitch {
  type: 'switch';
  props: {
    label: string;
    description?: string;
    valuePath: string;
    onChange?: string;
    disabled?: boolean;
  };
}

export type UIComponents = UIStack | UISection | UIText | UISwitch;

export interface ScreenAction {
  method: 'PATCH' | 'PUT' | 'POST';
  href: string;
}

export interface UIScreen {
  version: number;
  screen: string;
  data: ScreenData;
  ui: UIComponents;
  actions: Record<string, ScreenAction>;
}
