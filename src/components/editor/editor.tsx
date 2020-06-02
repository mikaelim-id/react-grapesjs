import grapesjs from 'grapesjs';
import newsletter from 'grapesjs-preset-newsletter';
import webpage from 'grapesjs-preset-webpage';
import React from 'react';

const presets: any = {
    webpage,
    newsletter,
};

export interface EditorProps {
    id?: string;
    presetType?: 'webpage' | 'newsletter';
    width?: string | number;
    height?: string | number;
    children?: React.ReactElement | React.ReactElement[];
    blockManager?: any;
    storageManager?: any;
    styleManager?: {};
    blocks?: object[];
    components?: object[];

    onInit?(editor: grapesjs.Editor): void;

    onDestroy?(editor: grapesjs.Editor): void;

    onUpdate?(editor: grapesjs.Editor): void;
}

interface EditorState {
    editor: any;
}

class Editor extends React.Component<EditorProps, EditorState> {
    public static defaultProps: EditorProps = {
        id: 'gjs',
        presetType: 'webpage',
        width: 'auto',
        height: '100vh',
        blockManager: {},
        storageManager: {},
        styleManager: {},
        blocks: [],
        components: [],
    };

    public componentDidMount(): void {
        const {
            id,
            width,
            height,
            blockManager,
            storageManager,
            styleManager,
            presetType,
            onInit,
        } = this.props;

        const editor = grapesjs.init({
            container: `#${id}`,
            fromElement: true,
            width,
            height,
            blockManager,
            storageManager,
            styleManager,
            plugins: [
                presets[presetType],
            ],
        });

        if (typeof onInit === 'function') {
            onInit(editor);
        }

        editor.on('change:changesCount', this.handleOnUpdate.bind(this));

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


    public handleOnUpdate(): void {
        this.props.onUpdate(this.state.editor);
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
