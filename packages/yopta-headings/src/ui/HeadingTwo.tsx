import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { HeadingOptions, HeadingTwoElement } from '../types';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({ attributes, children, element }: RenderElementProps<HeadingTwoElement>) => {
  return (
    <h2 id={element.id} draggable={false} className={s['heading-two']} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = createYoptaPlugin<HeadingOptions, HeadingTwoElement>({
  type: 'heading-two',
  renderer: (editor) => HeadingTwoRender,
  shortcut: ['h2', 'subtitle', '##'],
  placeholder: 'Heading 2',
  defineElement: (): HeadingTwoElement => ({
    id: generateId(),
    type: 'heading-two',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor) {
    const node: HeadingTwoElement = HeadingTwo.getPlugin.defineElement();

    Transforms.setNodes<HeadingTwoElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `## ${text}`,
      deserialize: (node) => '',
    },
    html: {
      serialize: (node) => 'lolkek',
      deserialize: (node) => '',
    },
  },
  options: {
    anchor: '#',
  },
});

export { HeadingTwo };
