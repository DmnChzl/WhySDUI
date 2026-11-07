import ToggleSwitch from './components/toggleSwitch';
import type { ScreenData, UIComponents } from './types/schema';
import { readBoolean, valueToRecord } from './utils';

type ActionHandler = (actionName: string, payload: Record<string, boolean>) => void;

interface RenderContext {
  data: ScreenData;
  onAction: ActionHandler;
}

export const renderNode = (node: UIComponents, ctx: RenderContext) => {
  switch (node.type) {
    case 'stack':
      return <div class="stack">{node.children.map((child) => renderNode(child, ctx))}</div>;

    case 'section':
      return (
        <section>
          <h2>{node.props.title}</h2>
          {node.children.map((child) => renderNode(child, ctx))}
        </section>
      );

    case 'text':
      return <p class={node.props.style === 'muted' ? 'text-muted' : undefined}>{node.props.value}</p>;

    case 'switch': {
      const { label, description, valuePath, onChange, disabled } = node.props;
      const checked = readBoolean(ctx.data, valuePath);

      return (
        <div class="switch-row">
          <div class="switch-row__content">
            <span class="switch-row__content-title">{label}</span>
            <span class="switch-row__content-description">{description}</span>
          </div>

          <ToggleSwitch
            checked={checked}
            onChange={(event) => {
              if (!onChange) return;

              ctx.onAction(onChange, valueToRecord(event.currentTarget.checked, valuePath));
            }}
            disabled={disabled}
          />
        </div>
      );
    }

    default:
      // eslint-disable-next-line no-console
      console.warn(`Unknown Node Type: ${(node as { type?: unknown }).type}`);

      return <p class="text-danger">Unavailable Content.</p>;
  }
};
