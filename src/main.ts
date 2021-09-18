import "./style.css";
import { EditorKit, EditorKitDelegate } from "sn-editor-kit";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { gfm } from "@milkdown/preset-gfm";
import { nord } from "@milkdown/theme-nord";
import { listener, listenerCtx } from '@milkdown/plugin-listener';

class MilkdownEditor {
  editorKit: any;
  constructor() {
    // Initialize an empty editor anyway (for browsers)
    this.initMilkdown("");
    const delegate = new EditorKitDelegate({
      setEditorRawText: (text: string) => {
        // Re-render the editor once SN give us text
        this.initMilkdown(text);
      },
    });

    this.editorKit = new EditorKit({
      delegate: delegate,
      mode: "plaintext",
      supportsFilesafe: false,
    });
  }

  initMilkdown(defaultValue: string) {
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, document.getElementById("app"));
        ctx.set(defaultValueCtx, defaultValue);
          ctx.set(listenerCtx, {
            markdown: [(get) => this.saveNote(get())],
          });
      })
      .use(nord)
      .use(gfm)
      .use(listener)
      .create();
  }

  saveNote(text: string) {
    /** This will work in an SN context, but breaks the standalone editor,
     * so we need to catch the error
     */
    try {
      this.editorKit.onEditorValueChanged(text);
    } catch (error) {
      console.log("Error saving note:", error);
    }
  }
}

new MilkdownEditor();
