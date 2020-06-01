import grapesjs from 'grapesjs';
import mjml from 'grapesjs-mjml';
import newsletter from 'grapesjs-preset-newsletter';
import webpage from 'grapesjs-preset-webpage';
import React from 'react';

const presets: any = {
    webpage,
    newsletter,
    mjml,
};

export interface EditorProps {
    id?: string;
    presetType?: 'webpage' | 'newsletter' | 'mjml';
    width?: string | number;
    height?: string | number;
    children?: React.ReactElement | React.ReactElement[];
    storageManager?: any;
    blockManager?: any;
    styleManager?: {};
    components?: object[];
    blocks?: object[];

    onInit?(editor: any): void;

    onDestroy?(editor: any): void;
}

interface EditorState {
    editor: any;
}

class Editor extends React.Component<EditorProps, EditorState> {
    public static defaultProps: EditorProps = {
        id: 'gjs',
        presetType: 'newsletter',
        width: 'auto',
        height: '100vh',
        blockManager: {},
        storageManager: {},
        styleManager: {},
        components: [],
    };

    public componentDidMount(): void {
        const {
            id,
            width,
            height,
            styleManager,
            storageManager,
            presetType,
            onInit,
        } = this.props;

        const editor = grapesjs.init({
            container: `#${id}`,
            fromElement: true,
            width,
            height,
            styleManager,
            storageManager,
            plugins: [
                presets[presetType],
            ],
        });

        if (typeof onInit === 'function') {
            onInit(editor);
        }

        this.setState({
            editor,
        });
    }

    public componentWillUnmount(): void {
        const {editor} = this.state;
        const {onDestroy, id} = this.props;

        if (editor) {
            if (typeof onDestroy === 'function') {
                onDestroy(editor);
            }

            setTimeout(() => {
                editor.destroy();
            }, 0);

            if (document) {
                const container: HTMLDivElement = document.getElementById(id) as HTMLDivElement;
                if (container) {
                    container.innerHTML = '';
                }
            }
        }
    }

    public render() {
        const {id, children} = this.props;

        return (
            <div id={id}>
                {children}
            </div>
        );
    }
}

export default Editor;
