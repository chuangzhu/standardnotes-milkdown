import "./style.css";
import "katex/dist/katex.min.css";
import "material-icons/iconfont/material-icons.css";
import "prismjs/themes/prism.css";
import { EditorKit, EditorKitDelegate } from "sn-editor-kit";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { gfm } from "@milkdown/preset-gfm";
import { nord } from "@milkdown/theme-nord";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { tooltip } from "@milkdown/plugin-tooltip";
import { slash } from "@milkdown/plugin-slash";
import { history } from "@milkdown/plugin-history";
import { clipboard } from "@milkdown/plugin-clipboard";
import { emoji } from "@milkdown/plugin-emoji";
import { prism } from "@milkdown/plugin-prism";
import { math } from "@milkdown/plugin-math";

class MilkdownEditor {
  editorKit: any;
  constructor() {
    const delegate = new EditorKitDelegate({
      setEditorRawText: (text: string) => {
        // Render the editor once SN give us text
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
    const app = document.getElementById("app")!;
    app.innerHTML = "";
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, app);
        ctx.set(defaultValueCtx, defaultValue);
        ctx.set(listenerCtx, {
          markdown: [(get) => this.saveNote(get())],
        });
      })
      .use(nord)
      .use(gfm)
      .use(listener)
      .use(math)
      .use(slash)
      .use(tooltip)
      .use(history)
      .use(emoji)
      .use(clipboard)
      .use(prism)
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
